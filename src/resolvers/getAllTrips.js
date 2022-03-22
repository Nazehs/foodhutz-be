const { ApolloError, AuthenticationError } = require("apollo-server-express");
const { Trip } = require("../models");

const getAllTrips = async (_, { tripId }, { user }) => {
  try {
    if (!user) {
      throw new AuthenticationError("Unauthorised to perform this operation");
    }

    return {
      success: true,
      status: 0,
      trips: await Trip.find({}).populate("order"),
    };
  } catch (error) {
    console.log(`[ERROR]: Failed get trip details | ${error.message}`);
    throw new ApolloError("Failed get trip details ");
  }
};

module.exports = getAllTrips;
