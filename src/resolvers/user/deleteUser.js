const { ApolloError } = require("apollo-server-express");
const { User } = require("../../models");

const deleteUser = async (_, { userId }) => {
  try {
    await User.findByIdAndDelete(userId);
    return {
      success: true,
      status: 0,
      message: "User deleted successfully",
    };
  } catch (error) {
    console.log(`[ERROR]: Failed to sign up | ${error.message}`);
    throw new ApolloError("Failed to sign up");
  }
};

module.exports = deleteUser;
