const { ApolloError, AuthenticationError } = require("apollo-server-express");
const { Payment } = require("../../models");

const updatePayment = async (_, { paymentId, input }, { user }) => {
  try {
    if (!user) {
      throw new AuthenticationError("Unauthorised to perform this operation");
    }
    return Payment.findByIdAndUpdate(paymentId, input)
      .populate("bankDetails")
      .populate("driver")
      .populate("restaurant");
  } catch (error) {
    console.log(`[ERROR]: Failed to update payment | ${error.message}`);
    throw new ApolloError(`Failed to update payment || ${error.message}`);
  }
};
module.exports = updatePayment;
