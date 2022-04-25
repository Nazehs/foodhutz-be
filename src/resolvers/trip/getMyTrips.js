const { ApolloError, AuthenticationError } = require("apollo-server-express");
const { Trip } = require("../../models");

const getMyTrips = async (_, __, { user }) => {
  try {
    if (!user) {
      throw new AuthenticationError("Unauthorised to perform this operation");
    }
    return await Trip.findById(user.id).populate("order");
  } catch (error) {
    console.log(`[ERROR]: Failed get trip my details | ${error.message}`);
    throw new ApolloError("Failed get trip details ");
  }
};

module.exports = getMyTrips;
