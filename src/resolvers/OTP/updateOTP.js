const { ApolloError, AuthenticationError } = require("apollo-server-express");

const { OTP } = require("../../models");

const updateOTP = async (_, { otpId, input }, { user }) => {
  try {
    if (!user) {
      throw new AuthenticationError("Unauthorised to perform this operation");
    }

    return await OTP.findByIdAndUpdate(otpId, input, { new: true }).populate(
      "category"
    );
  } catch (error) {
    console.log(`[ERROR]: Failed to update OTP  details | ${error.message}`);
    throw new ApolloError("Failed to update OTP details");
  }
};

module.exports = updateOTP;
