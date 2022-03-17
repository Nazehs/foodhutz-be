const { ApolloError } = require("apollo-server-express");
const { Restaurant } = require("../models");

const deleteRestaurant = async (_, { restaurantId }) => {
  try {
    await Restaurant.findByIdAndDelete(restaurantId);
    return {
      success: true,
      status: 0,
      message: "Trip deleted successfully",
    };
  } catch (error) {
    console.log(`[ERROR]: Failed delete trip | ${error.message}`);
    throw new ApolloError("Failed delete trip");
  }
};

module.exports = deleteRestaurant;
