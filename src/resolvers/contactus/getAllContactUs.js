const { ApolloError, AuthenticationError } = require("apollo-server-express");

const { ContactUs } = require("../../models");

const getAllContactUs = async (_, __, { user }) => {
  try {
    if (!user) {
      throw new AuthenticationError("Unauthorised to perform this operation");
    }

    return {
      status: 0,
      menus: await ContactUs.find({}),
      messages: "success",
    };
  } catch (error) {
    console.log(`[ERROR]: Failed to get contact us details | ${error.message}`);
    throw new ApolloError("Failed to get contact us details");
  }
};

module.exports = getAllContactUs;
