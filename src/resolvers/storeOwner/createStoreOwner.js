const { ApolloError, AuthenticationError } = require("apollo-server-express");
const { StoreOwner } = require("../../models");

const createStoreOwner = async (_, { input }, { user }) => {
  try {
    if (!user) {
      throw new AuthenticationError("Unauthorised to perform this operation");
    }
    return await StoreOwner.create(input);
  } catch (error) {
    console.log(`[ERROR]: Failed to create StoreOwner | ${error.message}`);
    throw new ApolloError("Failed to create StoreOwner");
  }
};

module.exports = createStoreOwner;
