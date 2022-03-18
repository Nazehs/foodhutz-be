const { ApolloError } = require("apollo-server-express");
const { Menu } = require("../models");
const { signToken } = require("../utils/auth");

const createMenu = async (_, { input }) => {
  console.log(input);
  try {
    const user = await Menu.create(input);
    console.log(user);
    return {
      token: signToken(user),
      user,
    };
  } catch (error) {
    console.log(`[ERROR]: Failed to create a menu | ${error.message}`);
    throw new ApolloError("Failed to create a menu");
  }
};

module.exports = createMenu;
