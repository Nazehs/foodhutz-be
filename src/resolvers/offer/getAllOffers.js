const { ApolloError, AuthenticationError } = require("apollo-server-express");

const { Offers } = require("../../models");

const getAllOffers = async (_, { offerId }, { user }) => {
  try {
    if (!user) {
      throw new AuthenticationError("Unauthorised to perform this operation");
    }

    return { status: 0, success: true, offers: await Offers.find({}) };
  } catch (error) {
    console.log(`[ERROR]: Failed to get offer details| ${error.message}`);
    throw new ApolloError("Failed to get offer details");
  }
};

module.exports = getAllOffers;
