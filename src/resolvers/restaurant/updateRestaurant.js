const { ApolloError, AuthenticationError } = require("apollo-server-express");

const { StoreOwner } = require("../../models");

const updateStoreOwner = async (_, { restaurantId, input }, { user }) => {
  try {
    if (!user) {
      throw new AuthenticationError("Unauthorised to perform this operation");
    }

    console.log(user, restaurantId);

    return await StoreOwner.findByIdAndUpdate(restaurantId, input, {
      new: true,
    })
      .populate("categories")
      .populate("orders")
      .populate("menus")
      .populate("coupons");
  } catch (error) {
    console.log(`[ERROR]: Failed to update StoreOwner | ${error.message}`);
    throw new ApolloError(`Failed to update StoreOwner  || ${error.message}`);
  }
};

module.exports = updateStoreOwner;
