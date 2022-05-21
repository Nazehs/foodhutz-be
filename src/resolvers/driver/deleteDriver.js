const { ApolloError } = require("apollo-server-express");
const { Driver } = require("../../models");

const deleteDriver = async (_, { userId }, { user }) => {
  try {
    return await Driver.findByIdAndDelete(userId);
  } catch (error) {
    console.log(`[ERROR]: Failed to create trip | ${error.message}`);
    throw new ApolloError(`Failed to create trip || ${error.message}`);
  }
};

module.exports = deleteDriver;
