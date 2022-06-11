const { ApolloError, AuthenticationError } = require("apollo-server-express");
const { Order, User } = require("../../models");
const {
  createPaymentIntent,
  createCustomer,
  getCustomerPaymentMethods,
} = require("./stripePaymentHelpers");

const createUserPaymentIntent = async (_, { input }, { user }) => {
  try {
    if (!user) {
      throw new AuthenticationError("Unauthorised to perform this operation");
    }

    // get the order charges
    const customerOrder = await Order.findById(input?.orderId);

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
    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await createPaymentIntent({
      amount: customerOrder.finalPrice * 100 || 300,
      currency: "gbp",
      description: process?.env?.APP_NAME,
      statement_descriptor: "Order payment from foodhutz",
      customer: user?.stripeCustomerId || customer?.id,
      receipt_email: user?.email,
      customer: customer?.stripeCustomerId || user?.stripeCustomerId,
      metadata: { orderId: customerOrder?._id, user: JSON.stringify(user) },
      receipt_email: user?.email,
    });

    return {
      clientSecret: paymentIntent?.id,
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
