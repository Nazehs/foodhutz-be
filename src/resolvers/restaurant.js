const { ApolloError } = require("apollo-server-express");
const { Restaurant } = require("../models");

const restaurants = async (_, { input }) => {
  console.log(input);
  try {
    return await Restaurant.create(input);
  } catch (error) {
    console.log(`[ERROR]: Failed to create restaurant | ${error.message}`);
    throw new ApolloError("Failed to create restaurant");
  }
};

module.exports = restaurants;
