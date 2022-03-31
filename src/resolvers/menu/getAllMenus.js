const { ApolloError, AuthenticationError } = require("apollo-server-express");

const { Menu } = require("../../models");

const getAllMenus = async (_, { skip = 0, limit = 10 }, { user }) => {
  try {
    if (!user) {
      throw new AuthenticationError("Unauthorised to perform this operation");
    }

    const docs = await Menu.find({}).skip(skip).limit(limit);
    const docsCount = await Menu.count();
    const totalPages = Math.ceil(docsCount / limit);
    const currentPage = Math.ceil(docsCount % (skip + 1));

    return {
      menus: docs,
      success: true,
      status: 0,
      currentPage: currentPage == 0 ? currentPage + 1 : currentPage,
      totalPages,
      hasMore: docsCount >= limit + 1,
    };
  } catch (error) {
    console.log(`[ERROR]: Failed to get meal details | ${error.message}`);
    throw new ApolloError("Failed to get meal details");
  }
};

module.exports = getAllMenus;
