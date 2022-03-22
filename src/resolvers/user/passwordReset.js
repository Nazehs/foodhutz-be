const { ApolloError, AuthenticationError } = require("apollo-server-express");
const { User } = require("../../models");

const userPasswordReset = async (_, { userId }, { user }) => {
  try {
    if (!user) {
      console.log("[ERROR]: Failed to reset password");
      throw new AuthenticationError("Failed to reset password");
    }
    return await User.findByIdAndDelete(userId);
  } catch (error) {
    console.log(`[ERROR]: Failed to reset password | ${error.message}`);
    throw new ApolloError("Failed to reset password");
  }
};

module.exports = userPasswordReset;
