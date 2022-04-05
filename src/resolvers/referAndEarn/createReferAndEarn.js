const { ApolloError, AuthenticationError } = require("apollo-server-express");
const { ReferAndEarn } = require("../../models");

const createReferAndEarn = async (_, { input }, { user }) => {
  try {
    if (!user) {
      throw new AuthenticationError("Unauthorised to perform this operation");
    }
    input.user = user.id;
    const doc = await ReferAndEarn.create(input);
    return await ReferAndEarn.findById(doc._id).populate("user");
  } catch (error) {
    console.log(
      `[ERROR]: Failed to create a refer and earn | ${error.message}`
    );
    throw new ApolloError("Failed to create a  refer and earn");
  }
};

module.exports = createReferAndEarn;
