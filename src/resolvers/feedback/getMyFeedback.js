const { ApolloError, AuthenticationError } = require("apollo-server-express");

const { Feedback } = require("../../models");

const updateFeedback = async (_, { limit = 10, skip = 0 }, { user }) => {
  try {
    if (!user) {
      throw new AuthenticationError("Unauthorised to perform this operation");
    }
    if (limit == 0) {
      throw new ApolloError("Provide a valid limit");
    }
    if (user.userType === "DRIVER" || user.userType === "RESTAURANT") {
      let docs;
      if (user.userType.toUpperCase() === "DRIVER") {
        docs = await Feedback.find({ driver: user.id })
          .skip(skip)
          .limit(limit)
          .populate("user")
          .populate("order")
          .populate("driver")
          .sort({ createdAt: 1 });
      }
      if (user.userType.toUpperCase() === "RESTAURANT") {
        docs = await Feedback.find({ restaurant: user.id })
          .skip(skip)
          .limit(limit)
          .populate("user")
          .populate("order")
          .populate("restaurant")
          .sort({ createdAt: -1 });
      }
      const feedbackCount = docs.length;
      const totalPages = Math.ceil(feedbackCount / limit);
      const currentPage = Math.ceil(feedbackCount % (skip + 1));

      return {
        status: 0,
        feedbacks: docs,
        success: true,
        status: 0,
        currentPage: currentPage == 0 ? currentPage + 1 : currentPage,
        totalPages,
        hasMore: feedbackCount >= limit + 1,
      };
    } else {
      throw new ApolloError("Oops! Unauthorised to perform this operation");
    }
  } catch (error) {
    console.log(
      `[ERROR]: Failed to update feedback  details | ${error.message}`
    );
    throw new ApolloError("Failed to get my feedback");
  }
};

module.exports = updateFeedback;
