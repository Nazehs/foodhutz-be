const { ApolloError, AuthenticationError } = require("apollo-server-express");

const { Trip } = require("../../models");

const updateTrip = async (_, { tripId, input }, { user }) => {
  try {
    if (!user) {
      throw new AuthenticationError("Unauthorised to perform this operation");
    }

    return await Trip.findByIdAndUpdate(tripId, input, { new: true }).populate(
      "order"
    );
  } catch (error) {
    console.log(`[ERROR]: Failed to update trip | ${error.message}`);
    throw new ApolloError("Failed to update trip");
  }
};

module.exports = updateTrip;
