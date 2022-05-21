const { AuthenticationError } = require("apollo-server-express");
const { verifySMS } = require("../../utils/sms");

const verifyOTP = async (_, { input }) => {
  try {
    // verify the otp
    const response = await verifySMS({
      to: input.phoneNumber,
      code: input.code,
    });
    // check if twilio approved the otp
    if (response && response.status == "approved" && response.valid) {
      return { status: 0, message: "Approved", isValid: true };
    } else {
      return { status: 1, message: "Wrong", isValid: false };
    }
  } catch (error) {
    console.log(`[ERROR]: Failed to update OTP  details | ${error.message}`);
    throw new ApolloError(`Failed to update OTP details || ${error.message}`);
  }
};

module.exports = verifyOTP;
