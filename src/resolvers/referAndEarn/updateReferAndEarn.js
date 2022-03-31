const { ApolloError, AuthenticationError } = require("apollo-server-express");

const { ReferAndEarn } = require("../../models");

const updateReferAndEarn = async (_, { referralId, input }, { user }) => {
  try {
    if (!user) {
      throw new AuthenticationError("Unauthorised to perform this operation");
    }

    return await ReferAndEarn.findByIdAndUpdate(referralId, input, {
      new: true,
    }).populate("user");
  } catch (error) {
    console.log(
      `[ERROR]: Failed to update refer and earn  details | ${error.message}`
    );
    throw new ApolloError("Failed to update refer and earn details");
  }
};

module.exports = updateReferAndEarn;
