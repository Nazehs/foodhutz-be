const { ApolloError, AuthenticationError } = require("apollo-server-express");
const { Trip } = require("../../models");

const updateTrip = async (_, { tripId }, { user }) => {
  try {
    if (!user) {
      throw new AuthenticationError("Unauthorised to perform this operation");
    }

    return await Trip.findById(tripId);
  } catch (error) {
    console.log(`[ERROR]: Failed get trip details | ${error.message}`);
    throw new ApolloError("Failed get trip details ");
  }
};

module.exports = updateTrip;
