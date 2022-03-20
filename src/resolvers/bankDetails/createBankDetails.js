const { ApolloError } = require("apollo-server-express");
const { BankDetails } = require("../../models");

const createBankDetails = async (_, { input }, { user }) => {
  try {
    if (!user) {
      throw new AuthenticationError("Unauthorised to perform this operation");
    }
    return await BankDetails.create(input);
  } catch (error) {
    console.log(`[ERROR]: Failed to create bank details | ${error.message}`);
    throw new ApolloError("Failed to create bank details");
  }
};
module.exports = createBankDetails;
