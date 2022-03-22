const { ApolloError, AuthenticationError } = require("apollo-server-express");
const { User } = require("../../models");

const userPasswordReset = async (_, { email, phoneNumber }) => {
  try {
    if (email) {
      const user = await User.find({ phoneNumber });
      if (user) {
        console.log(user);
      }
      throw new ApolloError("Failed to reset password");
    }
    if (phoneNumber) {
      const user = await User.find({ phoneNumber });
      if (user) {
        console.log(user);
      }
      throw new ApolloError("Failed to reset password");
    }
  } catch (error) {
    console.log(`[ERROR]: Failed to reset password | ${error.message}`);
    throw new ApolloError("Failed to reset password");
  }
};

module.exports = userPasswordReset;
