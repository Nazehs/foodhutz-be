const { ApolloError, AuthenticationError } = require("apollo-server-express");

const { Category } = require("../../models");

const getAllCategory = async (_, { skip = 0, limit = 10 }, { user }) => {
  try {
    if (!user) {
      throw new AuthenticationError("Unauthorised to perform this operation");
    }
    const docs = await Category.find({}).skip(skip).limit(limit);
    const docsCount = await Category.count();
    const totalPages = Math.ceil(docsCount / limit);
    const currentPage = Math.ceil(docsCount % (skip + 1));
    return {
      status: 0,
      success: true,
      categories: docs,
      currentPage: currentPage == 0 ? currentPage + 1 : currentPage,
      totalPages,
      hasMore: docsCount >= limit + 1,
    };
  } catch (error) {
    console.log(`[ERROR]: Failed to get category details | ${error.message}`);
    throw new ApolloError("Failed to get category details");
  }
};

module.exports = getAllCategory;
