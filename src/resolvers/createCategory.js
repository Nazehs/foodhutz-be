const { ApolloError, AuthenticationError } = require("apollo-server-express");

const { Category } = require("../models");

const createCategory = async (_, { input }, context) => {
  try {
    if (!context.user) {
      throw new AuthenticationError("Unauthorised to perform this operation");
    }

    return await Category.create(input);
  } catch (error) {
    console.log(`[ERROR]: Failed to create category | ${error.message}`);
    throw new ApolloError("Failed to create category");
  }
};

module.exports = createCategory;
