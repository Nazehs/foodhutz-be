const { ApolloError, AuthenticationError } = require("apollo-server-express");

const { Restaurant } = require("../models");

const getAllRestaurants = async (_, __, { user }) => {
  try {
    if (!user) {
      throw new AuthenticationError("Unauthorised to perform this operation");
    }

    return {
      status: 0,
      success: true,
      restaurants: await Restaurant.find()
        .populate("categories")
        .populate("orders")
        .populate("menus")
        .populate("offers"),
    };
  } catch (error) {
    console.log(`[ERROR]: Failed to get all restaurants | ${error.message}`);
    throw new ApolloError("Failed to get all restaurants ");
  }
};

module.exports = getAllRestaurants;
