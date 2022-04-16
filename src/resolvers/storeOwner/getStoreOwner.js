const { ApolloError, AuthenticationError } = require("apollo-server-express");

const { StoreOwner } = require("../../models");

const getStoreOwner = async (_, { storeId }, { user }) => {
  try {
    if (!user) {
      throw new AuthenticationError("Unauthorised to perform this operation");
    }

    return await StoreOwner.findById(storeId)
      .populate("categories")
      .populate("orders")
      .populate("menus")
      .populate("coupons");
  } catch (error) {
    console.log(`[ERROR]: Failed to get StoreOwner details | ${error.message}`);
    throw new ApolloError("Failed to get StoreOwner details ");
  }
};

module.exports = getStoreOwner;
