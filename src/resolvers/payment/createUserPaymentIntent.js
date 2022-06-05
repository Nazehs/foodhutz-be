const { ApolloError, AuthenticationError } = require("apollo-server-express");
const { Order } = require("../../models");
const {
  createPaymentIntent,
  createCustomer,
} = require("./stripePaymentHelpers");

const createUserPaymentIntent = async (_, { input }, { user }) => {
  try {
    if (!user) {
      throw new AuthenticationError("Unauthorised to perform this operation");
    }

    // get the order charges
    const customerOrder = await Order.findById(input.orderId);
    // create customer

    user.description = `Customer payment for order ${customerOrder.orderId}`;

    // create the customer for one time payment
    const customer = await createCustomer(user);

    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await createPaymentIntent({
      amount: customerOrder.finalPrice * 100,
      currency: "gbp",
      automatic_payment_methods: {
        enabled: true,
      },
      // setup_future_usage: 'off_session',
      metadata: { orderId: customerOrder._id },
      receipt_email: "nazehabel@gmail.com" || user.email,
      customer: customer.id,
    });

    return {
      clientSecret: paymentIntent.id,
      status: 0,
      success: true,
      message: "payment intent created!",
    };
  } catch (error) {
    console.log(`[ERROR]: Failed to create payment intent | ${error.message}`);
    throw new ApolloError(
      `Failed to create payment intent || ${error.message}`
    );
  }
};
module.exports = createUserPaymentIntent;
