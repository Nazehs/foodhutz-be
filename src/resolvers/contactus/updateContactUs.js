const { ApolloError, AuthenticationError } = require("apollo-server-express");

const { ContactUs } = require("../../models");

const updateContactUs = async (_, { messageId, input }, { user }) => {
  try {
    if (!user) {
      throw new AuthenticationError("Unauthorised to perform this operation");
    }

    return await ContactUs.findByIdAndUpdate(messageId, input, {
      new: true,
    }).populate("user");
  } catch (error) {
    console.log(
      `[ERROR]: Failed to update  contact us details | ${error.message}`
    );
    throw new ApolloError("Failed to update contact us details");
  }
};

module.exports = updateContactUs;
