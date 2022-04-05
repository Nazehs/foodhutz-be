const { ApolloError, AuthenticationError } = require("apollo-server-express");

const { StoreOwner } = require("../../models");

const updateStoreOwner = async (_, { storeId, input }, { user }) => {
  try {
    if (!user) {
      throw new AuthenticationError("Unauthorised to perform this operation");
    }

    return await StoreOwner.findByIdAndUpdate(storeId, input, {
      new: true,
    })
      .populate("categories")
      .populate("orders")
      .populate("menus")
      .populate("coupon");
  } catch (error) {
    console.log(`[ERROR]: Failed to update StoreOwner | ${error.message}`);
    throw new ApolloError("Failed to update StoreOwner ");
  }
};

module.exports = updateStoreOwner;
