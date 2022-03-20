const { ApolloError } = require("apollo-server-express");
const { Trip } = require("../../models");

const createTrip = async (_, { input }, { user }) => {
  try {
    if (!user) {
      throw new AuthenticationError("Unauthorised to perform this operation");
    }

    return await Trip.create(input);
  } catch (error) {
    console.log(`[ERROR]: Failed to create trip | ${error.message}`);
    throw new ApolloError("Failed to create trip");
  }
};
module.exports = createTrip;
