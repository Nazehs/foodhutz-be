const { ApolloError } = require("apollo-server-express");
const { User } = require("../../models");

const deleteUser = async (_, { userId }, { user }) => {
  try {
    return await User.findByIdAndDelete(userId);
  } catch (error) {
    console.log(`[ERROR]: Failed to sign up | ${error.message}`);
    throw new ApolloError("Failed to sign up");
  }
};

module.exports = deleteUser;
