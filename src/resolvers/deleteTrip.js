const { ApolloError } = require("apollo-server-express");
const { Trips } = require("../models");

const deleteTrip = async (_, { tripId }) => {
  try {
    await Trips.findByIdAndDelete(tripId);
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

module.exports = deleteTrip;
