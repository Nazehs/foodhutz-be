const { ApolloError, AuthenticationError } = require("apollo-server-express");

const { Driver } = require("../../models");

const getDriver = async (_, { userId }, { user }) => {
  try {
    if (!user) {
      throw new AuthenticationError("Unauthorised to perform this operation");
    }

    return await Driver.findById(userId)
      .populate("documents")
      .populate("trips")
      .populate("bankDetails")
      .populate("tips");
  } catch (error) {
    console.log(
      `[ERROR - getDriver]: Failed to get user details | ${error.message}`
    );
    throw new ApolloError(`Failed to get user details || ${error.message}`);
  }
};

module.exports = getDriver;
