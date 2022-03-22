const { ApolloError } = require("apollo-server-express");
const { ContactUs } = require("../../models");

const createContactUs = async (_, { input }) => {
  try {
    return await ContactUs.create(input);
  } catch (error) {
    console.log(`[ERROR]: Failed to create a menu | ${error.message}`);
    throw new ApolloError("Failed to create a menu");
  }
};

module.exports = createContactUs;
