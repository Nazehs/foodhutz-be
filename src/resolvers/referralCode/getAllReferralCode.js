const { ApolloError, AuthenticationError } = require("apollo-server-express");

const { ReferralCode } = require("../../models");

const getAllReferralCode = async (_, __, { user }) => {
  try {
    if (!user) {
      throw new AuthenticationError("Unauthorised to perform this operation");
    }

    return {
      status: 0,
      menus: await ReferralCode.find({}),
      messages: "success",
    };
  } catch (error) {
    console.log(
      `[ERROR]: Failed to get referral code details | ${error.message}`
    );
    throw new ApolloError("Failed to get referral code details");
  }
};

module.exports = getAllReferralCode;
