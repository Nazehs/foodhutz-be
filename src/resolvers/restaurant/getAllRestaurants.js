const { ApolloError, AuthenticationError } = require("apollo-server-express");

const { Restaurant } = require("../../models");

const getAllRestaurants = async (_, { limit = 10, skip = 0 }, { user }) => {
  try {
    if (!user) {
      throw new AuthenticationError("Unauthorised to perform this operation");
    }
    const docs = await Restaurant.find()
      .populate("categories")
      .populate("orders")
      .populate("menus")
      .populate("offers");
    const docsCount = await Restaurant.count();
    const totalPages = Math.ceil(docsCount / limit);
    const currentPage = Math.ceil(docsCount % (skip + 1));
    return {
      status: 0,
      success: true,
      restaurants: docs,
      currentPage: currentPage == 0 ? currentPage + 1 : currentPage,
      totalPages,
      hasMore: docsCount >= limit + 1,
    };
  } catch (error) {
    console.log(`[ERROR]: Failed to get all restaurants | ${error.message}`);
    throw new ApolloError("Failed to get all restaurants ");
  }
};

module.exports = getAllRestaurants;
