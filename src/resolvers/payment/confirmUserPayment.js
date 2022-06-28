const { ApolloError, AuthenticationError } = require("apollo-server-express");
const { confirmCardPayment } = require("./stripePaymentHelpers");

const confirmUserPayment = async (_, { input }, { user }) => {
  try {
    if (!user) {
      throw new AuthenticationError("Unauthorised to perform this operation");
    }

    const confirmPayment = await confirmCardPayment(input);

    return confirmPayment;
  } catch (error) {
    console.log(`[ERROR]: Failed to create payment intent | ${error.message}`);
    throw new ApolloError(
      `Failed to create payment intent || ${error.message}`
    );
  }
};
module.exports = confirmUserPayment;
