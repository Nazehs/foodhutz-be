const { ApolloError, AuthenticationError } = require("apollo-server-express");
const { StoreOwner } = require("../../models");
const { signToken } = require("../../utils/auth");

const createStoreOwner = async (_, { input }) => {
  try {
    const user = await await StoreOwner.create(input);
    return {
      token: signToken(user),
      user,
    };
  } catch (error) {
    console.log(`[ERROR]: Failed to create StoreOwner | ${error.message}`);
    throw new ApolloError("Failed to create StoreOwner");
  }
};

module.exports = createStoreOwner;
