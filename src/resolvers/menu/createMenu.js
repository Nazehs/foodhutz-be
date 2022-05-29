const { ApolloError } = require("apollo-server-express");
const { Menu, StoreOwner } = require("../../models");

const createMenu = async (_, { input }, { user }) => {
  try {
    if (!user) {
      throw new AuthenticationError("Unauthorised to perform this operation");
    }
    const doc = await Menu.create(input);
    console.log(doc);
    await StoreOwner.findByIdAndUpdate(user.id, {
      $push: { menus: doc._id },
    });
    return await Menu.findById(doc._id).populate("category");
  } catch (error) {
    console.log(`[ERROR]: Failed to create a menu | ${error.message}`);
    throw new ApolloError(`Failed to create a menu | ${error.message}`);
  }
};

module.exports = createMenu;
