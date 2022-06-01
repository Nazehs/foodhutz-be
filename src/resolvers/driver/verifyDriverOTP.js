const { Driver } = require("../../models");
const { verifySMS } = require("../../utils/sms");

const verifyOTP = async (_, { input }) => {
  try {
    // verify the otp
    const response = await verifySMS({
      to: input.phoneNumber,
      code: input.code,
    });
    if (response && response.status == "approved" && response.valid) {
      await Driver.findOneAndUpdate({
        email: input.email,
        $set: { status: true },
      });
      return { status: 0, message: "Approved", isValid: true };
    }
  } catch (error) {
    console.log(`[ERROR]: Failed to update OTP  details | ${error.message}`);
    throw new ApolloError(`Failed to verify OTP details || ${error.message}`);
  }
};

module.exports = verifyOTP;
