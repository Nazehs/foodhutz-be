const { ApolloError } = require("apollo-server-express");
const { BankDetails } = require("../../models");

const getBankDetails = async (_, { bankId, input }, { user }) => {
  try {
    if (!user) {
      throw new AuthenticationError("Unauthorised to perform this operation");
    }
    return await BankDetails.findById(bankId);
  } catch (error) {
    console.log(`[ERROR]: Failed to get bankDetails | ${error.message}`);
    throw new ApolloError("Failed to get bankDetails");
  }
};
module.exports = getBankDetails;
