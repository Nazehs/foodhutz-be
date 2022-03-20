const { ApolloError, AuthenticationError } = require("apollo-server-express");

const { Category } = require("../../models");

const getAllCategory = async (_, __, { user }) => {
  try {
    if (!user) {
      throw new AuthenticationError("Unauthorised to perform this operation");
    }

    return {
      status: 0,
      success: true,
      categories: await Category.find({}),
    };
  } catch (error) {
    console.log(`[ERROR]: Failed to get category details | ${error.message}`);
    throw new ApolloError("Failed to get category details");
  }
};

module.exports = getAllCategory;
