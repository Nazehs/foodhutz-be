const { ApolloError } = require("apollo-server-express");
const { User } = require("../../models");

const deleteUser = async (_, { userId }, { user }) => {
  try {
    return await User.findByIdAndDelete(userId);
  } catch (error) {
    console.log(`[ERROR]: Failed to create trip | ${error.message}`);
    throw new ApolloError("Failed to create trip");
  }
};

module.exports = deleteUser;
