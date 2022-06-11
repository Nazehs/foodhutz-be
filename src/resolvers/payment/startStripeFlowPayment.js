const initiateStripeJourney = (__, { input }, req) => {
  try {
    // Generate a random string as `state` to protect from CSRF and include it in the session
    req.session.state = Math.random().toString(36).slice(2);
    // Define the mandatory Stripe parameters: make sure to include our platform's client ID
    let parameters = {
      client_id: config.stripe.clientId,
      state: req.session.state,
    };
    // Optionally, the Express onboarding flow accepts `first_name`, `last_name`, `email`,
    // and `phone` in the query parameters: those form fields will be prefilled
    parameters = Object.assign(parameters, {
      //   redirect_uri: config.publicDomain + "/pilots/stripe/token",
      "stripe_user[business_type]": input.type || "individual",
      "stripe_user[business_name]": input.businessName || undefined,
      "stripe_user[first_name]": input.firstName || undefined,
      "stripe_user[last_name]": input.lastName || undefined,
      "stripe_user[email]": input.email || undefined,
      "stripe_user[country]": input.country || undefined,
      // If we're suggesting this account have the `card_payments` capability,
      // we can pass some additional fields to prefill:
      // 'suggested_capabilities[]': 'card_payments',
      // 'stripe_user[street_address]': req.user.address || undefined,
      // 'stripe_user[city]': req.user.city || undefined,
      // 'stripe_user[zip]': req.user.postalCode || undefined,
      // 'stripe_user[state]': req.user.city || undefined,
    });
    console.log("Starting Express flow:", parameters);
    // Redirect to Stripe to start the Express onboarding flow
    res.redirect(
      process.env.STRIPE_AUTHORIZATION_URL +
        "?" +
        querystring.stringify(parameters)
    );
  } catch (error) {
    console.log(
      `[ERROR]: Failed to initiate stripe journey | ${error.message}`
    );
    throw new ApolloError(
      `Failed to initiate stripe journey ||${error.message} `
    );
  }
};
