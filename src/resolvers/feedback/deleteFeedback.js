const { ApolloError, AuthenticationError } = require("apollo-server-express");

const { Feedback } = require("../../models");

const deleteFeedback = async (_, { feedbackId }, { user }) => {
  try {
    if (!user) {
      throw new AuthenticationError("Unauthorised to perform this operation");
    }

    return await Feedback.findByIdAndDelete(feedbackId)
      .populate("user")
      .populate("order")
      .populate("driver")
      .populate("restaurant");
  } catch (error) {
    console.log(
      `[ERROR]: Failed to delete feedback  details | ${error.message}`
    );
    throw new ApolloError("Failed to delete feedback details");
  }
};

module.exports = deleteFeedback;
