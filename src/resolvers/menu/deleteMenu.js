const { ApolloError, AuthenticationError } = require("apollo-server-express");

const { Menu, StoreOwner } = require("../../models");

const deleteMenu = async (_, { menuId }, { user }) => {
  try {
    if (!user) {
      throw new AuthenticationError("Unauthorised to perform this operation");
    }
    const doc = await Menu.findByIdAndDelete(menuId);
    await StoreOwner.findByIdAndUpdate(user.id, {
      $pull: { menus: doc._id },
    });

    return doc;
  } catch (error) {
    console.log(`[ERROR]: Failed to delete menu  details | ${error.message}`);
    throw new ApolloError("Failed to delete menu details");
  }
};

module.exports = deleteMenu;
