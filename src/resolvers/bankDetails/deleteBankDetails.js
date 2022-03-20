const { ApolloError } = require("apollo-server-express");
const { BankDetails } = require("../../models");

const deleteBankDetails = async (_, { bankId }, { user }) => {
  try {
    if (!user) {
      throw new AuthenticationError("Unauthorised to perform this operation");
    }
    return await BankDetails.findByIdAndDelete(bankId);
  } catch (error) {
    console.log(`[ERROR]: Failed to delete bankDetails | ${error.message}`);
    throw new ApolloError("Failed to delete bankDetails");
  }
};
module.exports = deleteBankDetails;
