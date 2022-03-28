const { ApolloError, AuthenticationError } = require("apollo-server-express");

const { ReferAndEarn } = require("../../models");

const getReferAndEarn = async (_, { referralId }, { user }) => {
  try {
    if (!user) {
      throw new AuthenticationError("Unauthorised to perform this operation");
    }

    return await ReferAndEarn.findById(referralId)
      .populate("user")
  } catch (error) {
    console.log(
      `[ERROR]: Failed to get ReferAndEarn details| ${error.message}`
    );
    throw new ApolloError("Failed to get ReferAndEarn details");
  }
};

module.exports = getReferAndEarn;
