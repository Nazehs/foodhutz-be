const { ApolloError, AuthenticationError } = require("apollo-server-express");

const { Feedback } = require("../../models");

const getFeedback = async (_, { feedbackId }, { user }) => {
  try {
    if (!user) {
      throw new AuthenticationError("Unauthorised to perform this operation");
    }

    return await Feedback.findById(feedbackId)
      .populate("user")
      .populate("order")
      .populate("driver")
      .populate("restaurant");
  } catch (error) {
    console.log(`[ERROR]: Failed to get feedback details| ${error.message}`);
    throw new ApolloError("Failed to get feedback details");
  }
};

module.exports = getFeedback;
