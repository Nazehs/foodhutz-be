const { ApolloError, AuthenticationError } = require("apollo-server-express");

const { Offers } = require("../models");

const updateOffer = async (_, { offerId }, { user }) => {
  try {
    if (!user) {
      throw new AuthenticationError("Unauthorised to perform this operation");
    }

    return await Offers.findById(offerId);
  } catch (error) {
    console.log(`[ERROR]: Failed to get offer details| ${error.message}`);
    throw new ApolloError("Failed to get offer details");
  }
};

module.exports = updateOffer;
