const { ApolloError } = require("apollo-server-express");
const { Trip } = require("../models");

const trips = async (_, { input }) => {
  try {
    await Trip.create(input);

    return await Trip.create(input);
  } catch (error) {
    console.log(`[ERROR]: Failed to sign up | ${error.message}`);
    throw new ApolloError("Failed to sign up");
  }
};

module.exports = trips;
