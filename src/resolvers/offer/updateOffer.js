const { ApolloError, AuthenticationError } = require("apollo-server-express");

const { Offers } = require("../../models");

const updateOffer = async (_, { offerId, input }, { user }) => {
  try {
    if (!user) {
      throw new AuthenticationError("Unauthorised to perform this operation");
    }

    return await Offers.findByIdAndUpdate(offerId, input, { new: true });
  } catch (error) {
    console.log(`[ERROR]: Failed to get offer details| ${error.message}`);
    throw new ApolloError("Failed to get offer details");
  }
};

module.exports = updateOffer;