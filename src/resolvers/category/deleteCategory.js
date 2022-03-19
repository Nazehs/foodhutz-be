const { ApolloError, AuthenticationError } = require("apollo-server-express");

const { Category } = require("../../models");

const deleteCategory = async (_, { categoryId }, context) => {
  try {
    if (!context.user) {
      throw new AuthenticationError("Unauthorised to perform this operation");
    }

    return await Category.findById(categoryId);
  } catch (error) {
    console.log(`[ERROR]: Failed to delete category | ${error.message}`);
    throw new ApolloError("Failed to delete category");
  }
};

module.exports = deleteCategory;
