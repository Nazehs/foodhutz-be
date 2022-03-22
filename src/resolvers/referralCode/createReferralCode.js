const { ApolloError } = require("apollo-server-express");
const { ReferralCode } = require("../../models");

const createReferralCode = async (_, { input }) => {
  try {
    return await ReferralCode.create(input);
  } catch (error) {
    console.log(`[ERROR]: Failed to create a referral code | ${error.message}`);
    throw new ApolloError("Failed to create a referral code");
  }
};

module.exports = createMenu;
