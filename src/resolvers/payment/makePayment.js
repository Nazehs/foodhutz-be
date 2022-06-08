"use strict";

const config = require("../../config");
const stripe = require("stripe")(config.stripe.secretKey);
const { ApolloError } = require("apollo-server-core");

const makeOrderPayment = async (__, { input }, { user }) => {
  try {
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
      metadata: { orderId: customerOrder?._id },
      receipt_email: user?.email,
      customer: customer?.stripeCustomerId || user?.stripeCustomerId,
      payment_method: latest_pm,
      confirm: true,
      // transfer_data: {
      //   // Send the amount for the pilot after collecting a 20% platform fee:
      //   // the `amountForPilot` method simply computes `ride.amount * 0.8`
      //   amount: customerOrder?.finalPrice * 100,
      //   // The destination of this Payment Intent is the pilot's Stripe account
      //   destination: user.stripeAccountId,
      // },
    });
    customerOrder.paymentIntentId = paymentIntent.id;
    // Add the Stripe Payment Intent reference to the order and save it
    // update the order with the payment intent id
    await Order.findByIdAndUpdate(customerOrder._id, {
      paymentIntentId: paymentIntent.id,
    });
    console.log(
      `[INFO]: Payment intent created for order ${customerOrder._id}`
    );
    // Return the order info
    return {
      success: true,
      status: 0,
      order: customerOrder,
    };
  } catch (err) {
    console.log(`[ERROR]: Failed to make payment | ${err.message}`);
    throw new ApolloError(
      `Error taking payment from customer ||  ${err.message || err}`
    );
  }
};
