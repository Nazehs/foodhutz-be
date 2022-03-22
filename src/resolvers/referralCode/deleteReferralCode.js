const { ApolloError, AuthenticationError } = require("apollo-server-express");

const { ReferralCode } = require("../../models");

const deleteReferralCode = async (_, { codeId }, { user }) => {
  try {
    if (!user) {
      throw new AuthenticationError("Unauthorised to perform this operation");
    }

    return await ReferralCode.findByIdAndDelete(codeId);
  } catch (error) {
    console.log(
      `[ERROR]: Failed to delete referral code  details | ${error.message}`
    );
    throw new ApolloError("Failed to delete referral code details");
  }
};

module.exports = deleteReferralCode;
