"use strict";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const request = require("request-promise-native");
const querystring = require("querystring");
const express = require("express");
const { authMiddleware } = require("../utils/auth");
const router = express.Router();

/**
 * GET /payment/authorize
 *
 * Redirect to Stripe to set up payments.
 */
//  authMiddleware
router.get("/authorize", authMiddleware, (req, res) => {
  // Generate a random string as `state` to protect from CSRF and include it in the session
  req.session.state = Math.random().toString(36).slice(2);
  console.log("req.user", req.user);
  // Define the mandatory Stripe parameters: make sure to include our platform's client ID
  let parameters = {
    client_id: process.env.STRIPE_CLIENT_ID,
    state: req.session.state,
  };
  console.log(req.user, req.session);
  const { firstName, lastName, email, country, type, businessName } =
    req.user || {};
  // Optionally, the Express onboarding flow accepts `first_name`, `last_name`, `email`,
  // and `phone` in the query parameters: those form fields will be prefilled
  parameters = Object.assign(parameters, {
    redirect_uri: process.env.APP_URL + "/payment/token",
    "stripe_user[business_type]": type || "individual",
    "stripe_user[business_name]": businessName || undefined,
    "stripe_user[first_name]": firstName || undefined,
    "stripe_user[last_name]": lastName || undefined,
    "stripe_user[email]": email || undefined,
    "stripe_user[country]": country || "GB",
    // If we're suggesting this account have the `card_payments` capability,
    // we can pass some additional fields to prefill:
    "suggested_capabilities[]": "card_payments",
    "stripe_user[street_address]": req.user.address || undefined,
    "stripe_user[city]": req.user.city || undefined,
    "stripe_user[zip]": req.user.postalCode || undefined,
    "stripe_user[state]": req.user.city || undefined,
  });
  console.log("Starting Express flow:", parameters);
  res.redirect(
    process.env.STRIPE_AUTHORIZATION_URL +
      "?" +
      querystring.stringify(parameters)
  );
});

/**
 * GET /payment/token
 *
 * Connect the new Stripe account to the platform account.
 */
router.get("/token", async (req, res, next) => {
  // Check the `state` we got back equals the one we generated before proceeding (to protect from CSRF)
  if (req.session.state != req.query.state) {
    console.log("[ERROR]: Stripe state mismatch");
    // return res.redirect("/signup");
  }
  try {
    // Post the authorization code to Stripe to complete the Express onboarding flow

    const expressAuthorized = await request.post({
      uri: process.env.STRIPE_AUTHORIZATION_URL,
      form: {
        grant_type: "authorization_code",
        client_id: process.env.STRIPE_CLIENT_ID,
        client_secret: process.env.STRIPE_SECRET_KEY,
        code: req.query.code,
      },
      json: true,
    });

    if (expressAuthorized.error) {
      throw expressAuthorized.error;
    }

    // Update the model and store the Stripe account ID in the datastore:
    // this Stripe account ID will be used to issue payouts to the pilot
    req.user.stripeAccountId = expressAuthorized.stripe_user_id;

    // Redirect to the Rocket Rides dashboard
  } catch (err) {
    console.log("The Stripe onboarding process has not succeeded.");
    next(err);
  }
});

/**
 * GET /payment/dashboard
 *
 * Redirect to the pilots' Stripe Express dashboard to view payouts and edit account details.
 */
router.get("/dashboard", authMiddleware, async (req, res) => {
  const pilot = req.user;
  // Make sure the logged-in pilot completed the Express onboarding
  if (!pilot.stripeAccountId) {
    return res.redirect("/signup");
  }
  try {
    // Generate a unique login link for the associated Stripe account to access their Express dashboard
    const loginLink = await stripe.accounts.createLoginLink(
      pilot.stripeAccountId,
      {
        redirect_url: config.publicDomain + "/dashboard",
      }
    );
    // Directly link to the account tab
    if (req.query.account) {
      loginLink.url = loginLink.url + "#/account";
    }
    // Retrieve the URL from the response and redirect the user to Stripe
    return res.redirect(loginLink.url);
  } catch (err) {
    console.log(err);
    console.log("Failed to create a Stripe login link.");
    return res.redirect("/signup");
  }
});

module.exports = router;
