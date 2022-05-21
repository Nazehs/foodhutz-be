const { ApolloError, AuthenticationError } = require("apollo-server-express");

const { StoreOwner } = require("../../models");

const getAllStoreOwner = async (_, { limit = 10, skip = 0 }, { user }) => {
  try {
    if (!user) {
      throw new AuthenticationError("Unauthorised to perform this operation");
    }
    const docs = await StoreOwner.find()
      .populate("categories")
      .populate("orders")
      .populate("bankDetails")
      .populate("menus")
      .populate("coupons");

    const docsCount = await StoreOwner.count();
    const totalPages = Math.ceil(docsCount / limit);
    const currentPage = Math.ceil(docsCount % (skip + 1));
    return {
      status: 0,
      success: true,
      users: docs,
      currentPage: currentPage == 0 ? currentPage + 1 : currentPage,
      totalPages,
      hasMore: docsCount >= limit + 1,
    };
  } catch (error) {
    console.log(`[ERROR]: Failed to get all StoreOwner | ${error.message}`);
    throw new ApolloError(`Failed to get all StoreOwner  || ${error.message}`);
  }
};

module.exports = getAllStoreOwner;
