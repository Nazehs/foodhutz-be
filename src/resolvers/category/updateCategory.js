const { ApolloError, AuthenticationError } = require("apollo-server-express");
const { Category } = require("../../models");

const updateCategory = async (_, { categoryId, input }, { user }) => {
  try {
    if (!user) {
      throw new AuthenticationError("Unauthorised to perform this operation");
    }

    return await Category.findByIdAndUpdate(categoryId, input, { new: true });
  } catch (error) {
    console.log(`[ERROR]: Failed to update category | ${error.message}`);
    throw new ApolloError("Failed to update category");
  }
};

module.exports = updateCategory;
