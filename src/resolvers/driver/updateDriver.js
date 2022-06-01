const { ApolloError } = require("apollo-server-express");
const { Driver } = require("../../models");

const updateDriver = async (_, { input }, { user }) => {
  try {
    return await Driver.findByIdAndUpdate(user.id, input, {
      new: true,
    });
  } catch (error) {
    console.log(`[ERROR]: Failed to sign up | ${error.message}`);
    throw new ApolloError(`Failed to update driver || ${error.message}`);
  }
};

module.exports = updateDriver;
