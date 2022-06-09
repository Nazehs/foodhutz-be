const { ApolloError, AuthenticationError } = require("apollo-server-express");
const { BankDetails } = require("../../models");

const updateBankDetails = async (_, { bankId, input }, { user }) => {
  try {
    if (!user) {
      throw new AuthenticationError("Unauthorised to perform this operation");
    }
    return await BankDetails.findByIdAndUpdate(bankId, input, { new: true });
  } catch (error) {
    console.log(`[ERROR]: Failed to update bankDetails | ${error.message}`);
    throw new ApolloError("Failed to update bankDetails");
  }
};
module.exports = updateBankDetails;
