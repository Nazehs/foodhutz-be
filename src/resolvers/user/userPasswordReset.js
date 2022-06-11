const { ApolloError } = require("apollo-server-express");
const { User } = require("../../models");
const { sentSMS } = require("../../utils/sms");
const userPasswordReset = async (_, { email, phoneNumber }) => {
  try {
    if (email) {
      const user = await User.find({ phoneNumber });
      if (user) {
        await sentSMS(user.phoneNumber);
      }
      throw new ApolloError("Failed to reset password");
    }
    if (phoneNumber) {
      const user = await User.find({ phoneNumber });
      if (user) {
        await sentSMS(user.phoneNumber);
      }
      throw new ApolloError("Failed to reset password");
    }
  } catch (error) {
    console.log(
      `[ERROR - userPasswordReset]: Failed to reset password | ${error.message}`
    );
    throw new ApolloError(`Failed to reset password || ${error.message}`);
  }
};

module.exports = userPasswordReset;
