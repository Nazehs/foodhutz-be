const { ApolloError } = require("apollo-server-express");
const { User } = require("../models");
const { signToken } = require("../utils/auth");

const signup = async (_, { input }) => {
  console.log(input);
  try {
    const user = await User.create(input);
    console.log(user);
    return {
      token: signToken(user),
      user,
    };
  } catch (error) {
    console.log(`[ERROR]: Failed to sign up | ${error.message}`);
    throw new ApolloError("Failed to sign up");
  }
};

module.exports = signup;
