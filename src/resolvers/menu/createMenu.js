const { ApolloError } = require("apollo-server-express");
const { Menu } = require("../../models");

const createMenu = async (_, { input }) => {
  try {
    return await Menu.create(input);
  } catch (error) {
    console.log(`[ERROR]: Failed to create a menu | ${error.message}`);
    throw new ApolloError("Failed to create a menu");
  }
};

module.exports = createMenu;
