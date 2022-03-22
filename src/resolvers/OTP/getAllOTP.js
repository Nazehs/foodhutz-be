const { ApolloError, AuthenticationError } = require("apollo-server-express");

const { OTP } = require("../../models");

const getAllOTP = async (_, __, { user }) => {
  try {
    if (!user) {
      throw new AuthenticationError("Unauthorised to perform this operation");
    }

    return {
      status: 0,
      menus: await OTP.find({}),
      messages: "success",
    };
  } catch (error) {
    console.log(`[ERROR]: Failed to get OTP details | ${error.message}`);
    throw new ApolloError("Failed to get OTP details");
  }
};

module.exports = getAllOTP;
