"use strict";

const config = require("../../config");
const stripe = require("stripe")(config.stripe.secretKey);
const express = require("express");
const router = express.Router();
const Pilot = require("../../models/pilot");
const Passenger = require("../../models/passenger");
const Ride = require("../../models/ride");

const createExpressPayoutAccount = async () => {
  const account = await stripe.accounts.create({
    country: "US",
    type: "express",
  });

  // ephemeral keys are used for testing purposes only.
  const apiVersion = req.body["api_version"];
  try {
    // Find the latest passenger (see note above)
    const passenger = await Passenger.getLatest();
    // Create ephemeral key for customer
    const ephemeralKey = await stripe.ephemeralKeys.create(
      {
        customer: passenger.stripeCustomerId,
      },
      {
        stripe_version: apiVersion,
      }
    );
    // Respond with ephemeral key
    res.send(ephemeralKey);
  } catch (err) {
    res.sendStatus(500);
    next(`Error creating ephemeral key: ${err.message || err}`);
  }
};

const createPayment = async ({ input }) => {
  const { amount, currency, description, metadata } = req.body;
  //   const paymentIntent = await stripe.paymentIntents.create({
  //     amount,
  //     currency,
  //     description,
  //     metadata,
  //   });

  try {
    //    save the request to the database/get the order from db
    // get the customer payment method from stripe
    // create the payment intent with the customer payment method

    // get the order charges
    const customerOrder = await Order.findById(input?.orderId);
    // create customer

    user.description = `Customer payment for order ${input?.orderId}`;
    let customer;
    if (!user.stripeCustomerId) {
      // create the customer  since it does not exist
      customer = await createCustomer(user);
    }
    // if user has a stripe customer id
    const paymentMethods = await stripe.paymentMethods.list({
      customer: customer.id || user.stripeCustomerId,
      type: "card",
    });

    // This only works for the latest customer attached card.
    const latest_pm = paymentMethods.data[0].id;

    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await createPaymentIntent({
      amount: customerOrder.finalPrice * 100,
      currency: "gbp",
      description: config?.appName,
      statement_descriptor: config?.appName,
      automatic_payment_methods: {
        enabled: true,
      },
      // setup_future_usage: 'off_session',
      metadata: { orderId: customerOrder?._id },
      receipt_email: user?.email,
      customer: customer?.stripeCustomerId || user?.stripeCustomerId,
      payment_method: latest_pm,
      confirm: true,
      transfer_data: {
        // Send the amount for the pilot after collecting a 20% platform fee:
        // the `amountForPilot` method simply computes `ride.amount * 0.8`
        amount: order?.finalPrice * 100,
        // The destination of this Payment Intent is the pilot's Stripe account
        destination: user.stripeAccountId,
      },
    });

    // Add the Stripe Payment Intent reference to the order and save it
    // update the order with the payment intent id
    await Order.findByIdAndUpdate(customerOrder._id, {
      paymentIntentId: paymentIntent.id,
    });

    // Return the ride info
    return {
      pilot_name: pilot.displayName(),
      pilot_vehicle: pilot.rocket.model,
      pilot_license: pilot.rocket.license,
    };
  } catch (err) {
    res.sendStatus(500);
    next(`Error adding token to customer: ${err.message || err}`);
  }
};
