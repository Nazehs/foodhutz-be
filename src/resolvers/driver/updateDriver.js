const { ApolloError } = require("apollo-server-express");
const { Driver } = require("../../models");
const { signToken } = require("../../utils/auth");

const updateDriver = async (_, { input }, { user }) => {
  try {
    const currentUser = await Driver.findByIdAndUpdate(user.id, input, {
      new: true,
    });

    return {
      token: signToken(currentUser),
      user: currentUser,
    };
  } catch (error) {
    console.log(`[ERROR]: Failed to sign up | ${error.message}`);
    throw new ApolloError(`Failed to update driver || ${error.message}`);
  }
};

module.exports = updateDriver;
