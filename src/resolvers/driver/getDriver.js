const { ApolloError, AuthenticationError } = require("apollo-server-express");

const { Driver } = require("../../models");

const getDriver = async (_, __, { user }) => {
  try {
    if (!user) {
      throw new AuthenticationError("Unauthorised to perform this operation");
    }

    return await Driver.findById(user.id);
  } catch (error) {
    console.log(`[ERROR]: Failed to get user details | ${error.message}`);
    throw new ApolloError("Failed to get user details");
  }
};

module.exports = getDriver;
