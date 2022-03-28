const { ApolloError, AuthenticationError } = require("apollo-server-express");

const { ContactUs } = require("../../models");

const getContactUs = async (_, { messageId }, { user }) => {
  try {
    if (!user) {
      throw new AuthenticationError("Unauthorised to perform this operation");
    }

    return await ContactUs.findById(messageId).populate("user");
  } catch (error) {
    console.log(`[ERROR]: Failed to get ContactUs details| ${error.message}`);
    throw new ApolloError("Failed to get ContactUs details");
  }
};

module.exports = getContactUs;
