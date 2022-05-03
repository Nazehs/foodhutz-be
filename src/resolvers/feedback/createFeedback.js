const { ApolloError } = require("apollo-server-express");
const { Feedback } = require("../../models");

const createFeedback = async (_, { input }, { user }) => {
  try {
    if (!user) {
      throw new AuthenticationError("Unauthorised to perform this operation");
    }
    input.user = user.id;
    const doc = await Feedback.create(input);
    return await Feedback.findById(doc.id)
      .populate("user")
      .populate("order")
      .populate("driver")
      .populate("restaurant");
  } catch (error) {
    console.log(`[ERROR]: Failed to create a feedback | ${error.message}`);
    throw new ApolloError("Failed to create a feedback");
  }
};

module.exports = createFeedback;
