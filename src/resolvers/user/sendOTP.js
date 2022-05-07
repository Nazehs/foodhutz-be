const { sentSMS } = require("../../utils/sms");

const sendOTP = async (_, { input }) => {
  try {
    await sentSMS(input.phoneNumber);
    return {
      status: 0,
      message: `verification code sent ${input.phoneNumber} successfully`,
      success: true,
    };
  } catch (error) {
    console.log(`[ERROR]: Failed to update OTP  details | ${error.message}`);
    throw new ApolloError("Failed to update OTP details");
  }
};

module.exports = sendOTP;
