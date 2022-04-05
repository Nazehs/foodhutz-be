const { ApolloError, AuthenticationError } = require("apollo-server-express");

const { Restaurant, StoreOwner } = require("../../models");

const getRestaurant = async (_, { restaurantId }, { user }) => {
  try {
    if (!user) {
      throw new AuthenticationError("Unauthorised to perform this operation");
    }

    return await StoreOwner.findById(restaurantId)
      .populate("categories")
      .populate("orders")
      .populate("menus")
      .populate("coupon");
  } catch (error) {
    console.log(`[ERROR]: Failed to get restaurant details | ${error.message}`);
    throw new ApolloError("Failed to get restaurant details ");
  }
};

module.exports = getRestaurant;
