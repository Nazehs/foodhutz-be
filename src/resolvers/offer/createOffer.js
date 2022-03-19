const { ApolloError, AuthenticationError } = require("apollo-server-express");

const { Offers } = require("../../models");

const createOffer = async (_, { input }, context) => {
  try {
    if (!context.user) {
      throw new AuthenticationError("Unauthorised to perform this operation");
    }

    return await Offers.create(input);
  } catch (error) {
    console.log(`[ERROR]: Failed to create offers | ${error.message}`);
    throw new ApolloError("Failed to create offers ");
  }
};

module.exports = createOffer;
