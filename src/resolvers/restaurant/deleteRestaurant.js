const { ApolloError, AuthenticationError } = require("apollo-server-express");
const { StoreOwner } = require("../../models");

const deleteStoreOwner = async (_, { storeId }, { user }) => {
  try {
    if (!user) {
      throw new AuthenticationError("Unauthorised to perform this operation");
    }
    return await StoreOwner.findByIdAndDelete(storeId);
  } catch (error) {
    console.log(`[ERROR]: Failed delete StoreOwner | ${error.message}`);
    throw new ApolloError(`Failed delete StoreOwner || ${error.message}`);
  }
};

module.exports = deleteStoreOwner;
