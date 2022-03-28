const { ApolloError, AuthenticationError } = require("apollo-server-express");

const { ReferAndEarn } = require("../../models");

const getAllReferAndEarn = async (_, __, { user }) => {
  try {
    if (!user) {
      throw new AuthenticationError("Unauthorised to perform this operation");
    }

    return {
      status: 0,
      ReferAndEarnCodes: await ReferAndEarn.find({}).populate("user"),
      success: true,
    };
  } catch (error) {
    console.log(`[ERROR]: Failed to get meal details | ${error.message}`);
    throw new ApolloError("Failed to get meal details");
  }
};

module.exports = getAllReferAndEarn;
