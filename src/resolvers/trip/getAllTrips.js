const { ApolloError, AuthenticationError } = require("apollo-server-express");
const { Trip } = require("../../models");

const getAllTrips = async (_, { skip = 0, limit = 10 }, { user }) => {
  try {
    if (!user) {
      throw new AuthenticationError("Unauthorised to perform this operation");
    }
    const docs = await Trip.find({}).populate("order").skip(skip).limit(limit);
    const docsCount = await Trip.count();
    const totalPages = Math.ceil(docsCount / limit);
    const currentPage = Math.ceil(docsCount % (skip + 1));
    return {
      success: true,
      status: 0,
      trips: docs,
      currentPage: currentPage == 0 ? currentPage + 1 : currentPage,
      totalPages,
      hasMore: docsCount >= limit + 1,
    };
  } catch (error) {
    console.log(`[ERROR]: Failed get trip details | ${error.message}`);
    throw new ApolloError(`Failed get trip details || ${error.message} `);
  }
};

module.exports = getAllTrips;
