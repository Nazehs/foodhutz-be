const { ApolloError, AuthenticationError } = require("apollo-server-express");

const { Offers } = require("../../models");

const getAllOffers = async (_, { skip = 0, limit = 10 }, { user }) => {
  try {
    if (!user) {
      throw new AuthenticationError("Unauthorised to perform this operation");
    }
    
    const docs = await Offers.find({}).skip(skip).limit(limit);
    const docsCount = await Offers.count();
    const totalPages = Math.ceil(docsCount / limit);
    const currentPage = Math.ceil(docsCount % (skip + 1));

    return {
      status: 0,
      success: true,
      offers: docs,
      currentPage: currentPage == 0 ? currentPage + 1 : currentPage,
      totalPages,
      hasMore: docsCount >= limit + 1,
    };
  } catch (error) {
    console.log(`[ERROR]: Failed to get offer details| ${error.message}`);
    throw new ApolloError("Failed to get offer details");
  }
};

module.exports = getAllOffers;
