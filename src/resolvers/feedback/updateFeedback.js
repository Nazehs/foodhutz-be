const { ApolloError, AuthenticationError } = require("apollo-server-express");

const { Feedback } = require("../../models");

const updateFeedback = async (_, { feedbackId, input }, { user }) => {
  try {
    if (!user) {
      throw new AuthenticationError("Unauthorised to perform this operation");
    }

    return await Feedback.findByIdAndUpdate(feedbackId, input, {
      new: true,
    })
      .populate("user")
      .populate("order")
      .populate("restaurant")
      .populate("driver");
  } catch (error) {
    console.log(
      `[ERROR]: Failed to update feedback  details | ${error.message}`
    );
    throw new ApolloError("Failed to update feedback");
  }
};

module.exports = updateFeedback;
