const { ApolloError, AuthenticationError } = require("apollo-server-express");
const { Driver } = require("../../models");

const getMyTrips = async (_, { limit = 10, skip = 0 }, { user }) => {
  try {
    if (!user) {
      throw new AuthenticationError("Unauthorised to perform this operation");
    }
    const docs = await Driver.findById(user.id).populate("trips");

    const tripsCount = docs.trips.length;

    const totalPages = Math.ceil(tripsCount / limit);
    const currentPage = Math.ceil(tripsCount % (skip + 1));
    return {
      status: 0,
      success: true,
      currentPage: currentPage == 0 ? currentPage + 1 : currentPage,
      totalPages: totalPages == 0 ? totalPages + 1 : totalPages,
      hasMore: tripsCount >= limit + 1,
      trips: docs.trips,
    };

    // return await Trip.findById(user.id).populate("order");
  } catch (error) {
    console.log(`[ERROR]: Failed get trip my details | ${error.message}`);
    throw new ApolloError("Failed get trip details ");
  }
};

module.exports = getMyTrips;
