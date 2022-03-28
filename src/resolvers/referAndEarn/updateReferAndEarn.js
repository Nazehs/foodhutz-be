const { ApolloError, AuthenticationError } = require("apollo-server-express");

const { ReferAndEarn } = require("../../models");

const updateReferAndEarn = async (_, { referralId, input }, { user }) => {
  try {
    if (!user) {
      throw new AuthenticationError("Unauthorised to perform this operation");
    }

    return await ReferAndEarn.findByIdAndUpdate(referralId, input, {
      new: true,
    })
      .populate("userReferred")
      .populate("user");
  } catch (error) {
    console.log(`[ERROR]: Failed toupdate menu  details | ${error.message}`);
    throw new ApolloError("Failed to update menu details");
  }
};

module.exports = updateReferAndEarn;
