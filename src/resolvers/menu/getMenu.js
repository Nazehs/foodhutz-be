const { ApolloError, AuthenticationError } = require("apollo-server-express");

const { Menu } = require("../../models");

const getMenu = async (_, { menuId }, { user }) => {
  try {
    if (!user) {
      throw new AuthenticationError("Unauthorised to perform this operation");
    }

    return await Menu.findById(menuId).populate("category");
  } catch (error) {
    console.log(`[ERROR]: Failed to get menu details | ${error.message}`);
    throw new ApolloError(`Failed to get menu details | ${error.message}`);
  }
};

module.exports = getMenu;
