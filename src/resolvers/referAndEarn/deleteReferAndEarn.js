const { ApolloError, AuthenticationError } = require("apollo-server-express");

const { ReferAndEarn } = require("../../models");

const deleteReferAndEarn = async (_, { referralId }, { user }) => {
  try {
    if (!user) {
      throw new AuthenticationError("Unauthorised to perform this operation");
    }

    return await ReferAndEarn.findByIdAndDelete(referralId);
  } catch (error) {
    console.log(
      `[ERROR]: Failed to delete refer and earn  details | ${error.message}`
    );
    throw new ApolloError("Failed to delete refer and earn details");
  }
};

module.exports = deleteReferAndEarn;
