const { ApolloError } = require("apollo-server-express");

const { User } = require("../../models");

const getAllUsers = async (_, __, context) => {
  try {
    const user = await User.find();

    return { users: user, status: 0, message: "success", success: true };
  } catch (error) {
    console.log(`[ERROR]: Failed to get all  user  | ${error.message}`);
    throw new ApolloError("Failed to get users");
  }
};

module.exports = getAllUsers;
