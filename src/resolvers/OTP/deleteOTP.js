const { ApolloError, AuthenticationError } = require("apollo-server-express");

const { Menu } = require("../../models");

const deleteMenu = async (_, { menuId }, { user }) => {
  try {
    if (!user) {
      throw new AuthenticationError("Unauthorised to perform this operation");
    }

    return await Menu.findByIdAndDelete(menuId);
  } catch (error) {
    console.log(`[ERROR]: Failed to delete menu  details | ${error.message}`);
    throw new ApolloError("Failed to delete menu details");
  }
};

module.exports = deleteMenu;
