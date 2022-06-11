const { sentSMS } = require("../../utils/sms");

const sendOTP = async (_, { input }) => {
  try {
    await sentSMS(input.phoneNumber);
    console.log(
      `[INFO - sendOTP]: OTP sent successfully to ${input.phoneNumber}`
    );
    return {
      status: 0,
      message: `verification code sent ${input.phoneNumber} successfully`,
      success: true,
    };
  } catch (error) {
    console.log(
      `[ERROR - sendOTP]: Failed to send OTP  details | ${error.message}`
    );
    throw new ApolloError(`Failed to update OTP details || ${error.message}`);
  }
};

module.exports = sendOTP;
