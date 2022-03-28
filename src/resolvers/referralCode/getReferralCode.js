const { ApolloError, AuthenticationError } = require("apollo-server-express");

const { ReferralCode } = require("../../models");

const getReferralCode = async (_, { codeId }, { user }) => {
  try {
    if (!user) {
      throw new AuthenticationError("Unauthorised to perform this operation");
    }

    return await ReferralCode.findById(codeId).populate("owner");
  } catch (error) {
    console.log(
      `[ERROR]: Failed to get ReferralCode details| ${error.message}`
    );
    throw new ApolloError("Failed to get ReferralCode details");
  }
};

module.exports = getReferralCode;
