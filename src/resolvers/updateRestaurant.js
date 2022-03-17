const { ApolloError, AuthenticationError } = require("apollo-server-express");

const { Restaurant } = require("../models");

const updateRestaurant = async (_, { restaurantId, input }, {user}) => {
  try {
    if (!user) {
      throw new AuthenticationError("Unauthorised to perform this operation");
    }

    return await Restaurant.findByIdAndUpdate(restaurantId, input);
  } catch (error) {
    console.log(`[ERROR]: Failed to update restaurant | ${error.message}`);
    throw new ApolloError("Failed to update restaurant ");
  }
};

module.exports = updateRestaurant;
