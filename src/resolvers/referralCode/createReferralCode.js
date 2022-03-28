const { ApolloError, AuthenticationError } = require("apollo-server-express");
const { ReferralCode } = require("../../models");

const createReferralCode = async (_, { input }, { user }) => {
  try {
    if (!user) {
      throw new AuthenticationError("Unauthorised to perform this operation");
    }
    const doc = await ReferralCode.create(input);
    return await ReferralCode.findById(doc._id).populate("owner");
  } catch (error) {
    console.log(`[ERROR]: Failed to create a referral code | ${error.message}`);
    throw new ApolloError("Failed to create a referral code");
  }
};

module.exports = createReferralCode;
