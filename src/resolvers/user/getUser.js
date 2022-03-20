const { ApolloError, AuthenticationError } = require("apollo-server-express");

const { User } = require("../../models");

const getUser = async (_, __, { user }) => {
  try {
    if (!user) {
      throw new AuthenticationError("Unauthorised to perform this operation");
    }

    return await User.findById(user.id);
  } catch (error) {
    console.log(`[ERROR]: Failed to get user details | ${error.message}`);
    throw new ApolloError("Failed to get user details");
  }
};

module.exports = getUser;
