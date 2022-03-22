const { ApolloError } = require("apollo-server-express");
const { ReferAndEarn } = require("../../models");

const createReferAndEarn = async (_, { input }, { user }) => {
  try {
    return await ReferAndEarn.create(input);
  } catch (error) {
    console.log(
      `[ERROR]: Failed to create a refer and earn | ${error.message}`
    );
    throw new ApolloError("Failed to create a  refer and earn");
  }
};

module.exports = createReferAndEarn;
