const { ApolloError } = require("apollo-server-express");
const { OTP } = require("../../models");

const createOTP = async (_, { input }) => {
  try {
    return await OTP.create(input);
  } catch (error) {
    console.log(`[ERROR]: Failed to create a OTP | ${error.message}`);
    throw new ApolloError("Failed to create a OTP");
  }
};

module.exports = createOTP;
