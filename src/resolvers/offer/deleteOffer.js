const { ApolloError, AuthenticationError } = require("apollo-server-express");

const { Offers } = require("../../models");

const deleteOffers = async (_, { offerId }, context) => {
  try {
    if (!context.user) {
      throw new AuthenticationError("Unauthorised to perform this operation");
    }

    return await Offers.findByIdAndDelete(offerId);
  } catch (error) {
    console.log(`[ERROR]: Failed to delete offer | ${error.message}`);
    throw new ApolloError("Failed to delete offer ");
  }
};

module.exports = deleteOffers;
