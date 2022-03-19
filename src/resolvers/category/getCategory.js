const { ApolloError, AuthenticationError } = require("apollo-server-express");

const { Category } = require("../../models");

const getCategory = async (_, { categoryId }, { user }) => {
  try {
    if (!user) {
      throw new AuthenticationError("Unauthorised to perform this operation");
    }

    return await Category.findById(categoryId);
  } catch (error) {
    console.log(`[ERROR]: Failed to get category details | ${error.message}`);
    throw new ApolloError("Failed to get category details");
  }
};

module.exports = getCategory;
