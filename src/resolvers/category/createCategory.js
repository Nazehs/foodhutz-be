const { ApolloError, AuthenticationError } = require("apollo-server-express");

const { Category, StoreOwner } = require("../../models");

const createCategory = async (_, { input }, { user }) => {
  try {
    if (!user) {
      throw new AuthenticationError("Unauthorised to perform this operation");
    }
    const doc = await Category.create(input);
    await StoreOwner.findByIdAndUpdate(user.id, {
      $push: { categories: doc._id },
    });
    return doc;
  } catch (error) {
    console.log(`[ERROR]: Failed to create category | ${error.message}`);
    throw new ApolloError("Failed to create category");
  }
};

module.exports = createCategory;
