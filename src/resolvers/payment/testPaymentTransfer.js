const { AuthenticationError, ApolloError } = require("apollo-server-core");
const { testAccountTransferFunds } = require("./stripePaymentHelpers");

const testPaymentTransfer = async (__, { input }, { user }) => {
  try {
    // if (!user) {
    //   throw new AuthenticationError("Unauthorised to perform this operation");
    // }

    const testAccount = await testAccountTransferFunds({
      stripeAccountId: input.stripeAccountId,
      amount: input.amount,
      currency: input.currency,
      destination: input.destination,
    });
    console.log(testAccount);
  } catch (error) {
    console.log(
      `[ERROR - testPaymentTransfer]: Failed to create payment intent | ${error.message}`
    );
    throw new ApolloError(
      `Failed to test payment for user || ${error.message}`
    );
  }
};

module.exports = testPaymentTransfer;
