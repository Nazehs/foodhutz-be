const { ApolloError, AuthenticationError } = require("apollo-server-express");
const { StoreOwner } = require("../../models");

const deleteRestaurant = async (_, { restaurantId }, { user }) => {
  try {
    if (!user) {
      throw new AuthenticationError("Unauthorised to perform this operation");
    }
    return await StoreOwner.findByIdAndDelete(restaurantId);
  } catch (error) {
    console.log(`[ERROR]: Failed delete trip | ${error.message}`);
    throw new ApolloError("Failed delete trip");
  }
};

module.exports = deleteRestaurant;
