const { ApolloError, AuthenticationError } = require("apollo-server-express");
const { Payment } = require("../../models");

const getPayment = async (_, { paymentId }, { user }) => {
  try {
    if (!user) {
      throw new AuthenticationError("Unauthorised to perform this operation");
    }

    return Payment.findById(paymentId)
      .populate("bankDetails")
      .populate("driver")
      .populate("restaurant");
  } catch (error) {
    console.log(`[ERROR]: Failed to get payment details | ${error.message}`);
    throw new ApolloError(`Failed to get payment details || ${error.message}`);
  }
};
module.exports = getPayment;
