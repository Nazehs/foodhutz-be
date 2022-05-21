const { ApolloError } = require("apollo-server-express");
const { User } = require("../../models");
const { signToken } = require("../../utils/auth");

const updateUser = async (_, { input }, { user }) => {
  try {
    const currentUser = await User.findByIdAndUpdate(user.id, input, {
      new: true,
    });

    return {
      token: signToken(currentUser),
      user: currentUser,
    };
  } catch (error) {
    console.log(`[ERROR]: Failed to sign up | ${error.message}`);
    throw new ApolloError(`Failed to sign up || ${error.message}`);
  }
};

module.exports = updateUser;
