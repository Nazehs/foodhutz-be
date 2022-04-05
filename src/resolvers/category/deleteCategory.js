const { ApolloError, AuthenticationError } = require("apollo-server-express");

const { Category, StoreOwner } = require("../../models");

const deleteCategory = async (_, { categoryId }, { user }) => {
  try {
    if (!user) {
      throw new AuthenticationError("Unauthorised to perform this operation");
    }
    const doc = await Category.findByIdAndDelete(categoryId);
    await StoreOwner.findByIdAndUpdate(user.id, {
      $pull: { categories: doc._id },
    });
    return doc;
  } catch (error) {
    console.log(`[ERROR]: Failed to delete category | ${error.message}`);
    throw new ApolloError("Failed to delete category");
  }
};

module.exports = deleteCategory;
