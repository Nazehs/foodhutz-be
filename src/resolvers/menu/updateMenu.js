const { ApolloError, AuthenticationError } = require("apollo-server-express");

const { Menu } = require("../../models");

const updateMenu = async (_, { menuId, input }, { user }) => {
  try {
    if (!user) {
      throw new AuthenticationError("Unauthorised to perform this operation");
    }

    return await Menu.findByIdAndUpdate(menuId, input, { new: true }).populate(
      "category"
    );
  } catch (error) {
    console.log(`[ERROR]: Failed to update menu  details | ${error.message}`);
    throw new ApolloError(`Failed to update menu details | ${error.message}`);
  }
};

module.exports = updateMenu;
