const { ApolloError, AuthenticationError } = require("apollo-server-express");

const { User } = require("../../models");

const getUser = async (_, { userId }, { user }) => {
  try {
    if (!user) {
      throw new AuthenticationError("Unauthorised to perform this operation");
    }

    console.log(`[INFO - getUser]: Getting user with id ${userId}`);

    return await User.findById(userId).populate("orders");
  } catch (error) {
    console.log(
      `[ERROR - getUser]: Failed to get user details | ${error.message}`
    );
    throw new ApolloError(`Failed to get user details  || ${error.message}`);
  }
};

module.exports = getUser;
