const { ApolloError, AuthenticationError } = require("apollo-server-express");

const { Menu } = require("../models");

const getAllMenus = async (_, { mealId }, { user }) => {
  try {
    if (!user) {
      throw new AuthenticationError("Unauthorised to perform this operation");
    }

    return {
      status: 0,
      menus: await Menu.find({}),
      messages: "success",
    };
  } catch (error) {
    console.log(`[ERROR]: Failed to get meal details | ${error.message}`);
    throw new ApolloError("Failed to get meal details");
  }
};

module.exports = getAllMenus;
