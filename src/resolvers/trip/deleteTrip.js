const { ApolloError } = require("apollo-server-express");
const { Trip } = require("../../models");

const deleteTrip = async (_, { tripId }, { user }) => {
  try {
    if (!user) {
      throw new AuthenticationError("Unauthorised to perform this operation");
    }
    return await Trip.findByIdAndDelete(tripId);
  } catch (error) {
    console.log(`[ERROR]: Failed delete trip | ${error.message}`);
    throw new ApolloError(`Failed delete trip || ${error.message}`);
  }
};

module.exports = deleteTrip;
