const { ApolloError } = require("apollo-server-express");
const { Trip } = require("../models");

const createTrip = async (_, { input }) => {
  try {
    await Trip.create(input);

    return await Trip.create(input);
  } catch (error) {
    console.log(`[ERROR]: Failed to create trip | ${error.message}`);
    throw new ApolloError("Failed to create trip");
  }
};
module.exports = createTrip;
