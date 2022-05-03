const { ApolloError, AuthenticationError } = require("apollo-server-express");

const { Feedback } = require("../../models");

const getAllFeedback = async (_, { limit = 10, skip = 0 }, { user }) => {
  try {
    if (!user) {
      throw new AuthenticationError("Unauthorised to perform this operation");
    }

    if (limit == 0) {
      throw new ApolloError("Provide a valid limit");
    }
    const feedbackCount = await Complaint.count();

    const docs = await Feedback.find({})
      .skip(skip)
      .limit(limit)
      .populate("order")
      .populate({
        path: "order",
        populate: {
          path: "restaurant",
          model: "Restaurant",
        },
      })
      .populate({
        path: "order",
        populate: {
          path: "category",
          model: "Category",
        },
      })
      .populate("user")
      .populate("restaurant")
      .populate("driver");

    const totalPages = Math.ceil(feedbackCount / limit);
    const currentPage = Math.ceil(feedbackCount % (skip + 1));

    return {
      status: 0,
      feedback: docs,
      success: true,
      status: 0,
      currentPage: currentPage == 0 ? currentPage + 1 : currentPage,
      totalPages,
      hasMore: feedbackCount >= limit + 1,
    };
  } catch (error) {
    console.log(`[ERROR]: Failed to get all feedback | ${error.message}`);
    throw new ApolloError("Failed to get all feedback");
  }
};

module.exports = getAllFeedback;
