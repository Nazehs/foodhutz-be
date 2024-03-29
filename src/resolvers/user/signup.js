const { ApolloError } = require("apollo-server-express");
const { User } = require("../../models");
const { signToken } = require("../../utils/auth");
const signup = async (_, { input }) => {
  try {
    const isUserExisting = await User.findOne({ email: input.email });
    if (!isUserExisting) {
      const user = User.create(input).then((user) => user);
      //  set up stripe account and profile to the user
      return {
        token: signToken(user),
        user,
      };
    } else {
      throw new ApolloError("Failed to sign up user already exist");
    }
  } catch (error) {
    console.log(`[ERROR - signup]: Failed to sign up | ${error.message}`);
    if (error.message.includes("duplicate key error")) {
      throw new ApolloError(`Phone number or email already exist`);
    }
    throw new ApolloError(`Failed to sign up || ${error.message}`);
  }
};

module.exports = signup;
