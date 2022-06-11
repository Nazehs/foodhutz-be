"use strict";
const { ApolloError } = require("apollo-server-core");
const { User, Order } = require("../../models");
const {
  createCustomer,
  getCustomerPaymentMethods,
  createPaymentMethod,
  createPaymentIntent,
} = require("./stripePaymentHelpers");

const makeOrderPayment = async (__, { input }, { user }) => {
  try {
    // get the order charges
    const customerOrder = await Order.findById(input?.orderId);

    console.log(`[INFO]: Order found | ${customerOrder}`);
    // create customer

    user.description = `Customer payment for order ${input?.orderId}`;
    let customer;
    if (!user.stripeCustomerId) {
      // create the customer  since it does not exist
      customer = await createCustomer(user);
      await User.findByIdAndUpdate(user._id, {
        stripeCustomerId: customer.id,
      });
      user.stripeCustomerId = customer.id;
    }
    // if user has a stripe customer id
    let paymentMethods = await getCustomerPaymentMethods({
      customer: user?.stripeCustomerId || customer.id,
      type: "card",
    });
    // create the payment method
    let latest_pm;
    if (paymentMethods.data.length === 0) {
      paymentMethods = await createPaymentMethod({
        // customer: user?.stripeCustomerId || customer.id,
        type: "card",
        card: {
          number: "4242424242424242",
          exp_month: 6,
          exp_year: 2023,
          cvc: "314",
        },
      });
      latest_pm = paymentMethods.id;
    } else {
      // This only works for the latest customer attached card.
      latest_pm = paymentMethods.data[0].id;
    }
    console.log(paymentMethods);

    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await createPaymentIntent({
      amount: customerOrder.finalPrice * 100 || 300,
      currency: "gbp",
      description: process?.env?.APP_NAME,
      statement_descriptor: "Order payment",
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: { orderId: customerOrder?._id },
      receipt_email: user?.email,
      customer: customer?.stripeCustomerId || user?.stripeCustomerId,
      // payment_method: latest_pm,
      // confirm: true,
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
    const order = await Order.findByIdAndUpdate(
      customerOrder._id,
      {
        paymentIntentId: paymentIntent.id,
      },
      { new: true }
    );
    console.log(
      `[INFO]: Payment intent created for order ${customerOrder._id}`
    );
    console.log(`[INFO]: Payment intent id ${paymentIntent.id}`);
    // Return the order info
    return {
      success: true,
      status: 0,
      clientSecret: paymentIntent?.id,
      order,
    };
  } catch (err) {
    console.log(
      `[ERROR - makeOrderPayment]: Failed to make payment | ${err.message}`
    );
    throw new ApolloError(
      `Error taking payment from customer ||  ${err.message || err}`
    );
  }
};

module.exports = makeOrderPayment;
