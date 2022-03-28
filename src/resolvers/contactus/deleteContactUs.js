const { ApolloError, AuthenticationError } = require("apollo-server-express");

const { ContactUs } = require("../../models");

const deleteContactUs = async (_, { messageId }, { user }) => {
  try {
    if (!user) {
      throw new AuthenticationError("Unauthorised to perform this operation");
    }

    return await ContactUs.findByIdAndDelete(messageId);
  } catch (error) {
    console.log(
      `[ERROR]: Failed to delete  contact us message | ${error.message}`
    );
    throw new ApolloError("Failed to delete contact us message");
  }
};

module.exports = deleteContactUs;
