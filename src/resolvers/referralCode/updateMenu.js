const { ApolloError, AuthenticationError } = require("apollo-server-express");

const { ReferralCode } = require("../../models");

const updateReferralCode = async (_, { codeId, input }, { user }) => {
  try {
    if (!user) {
      throw new AuthenticationError("Unauthorised to perform this operation");
    }

    return await ReferralCode.findByIdAndUpdate(codeId, input, {
      new: true,
    }).populate("category");
  } catch (error) {
    console.log(
      `[ERROR]: Failed to update referral code  details | ${error.message}`
    );
    throw new ApolloError("Failed to update referral code details");
  }
};

module.exports = updateReferralCode;
