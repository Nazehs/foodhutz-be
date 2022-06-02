const { ApolloError, AuthenticationError } = require("apollo-server-express");

const { Notification } = require("../../models");

const getAllNotification = async (_, { limit = 10, skip = 0 }, { user }) => {
  try {
    if (!user) {
      throw new AuthenticationError("Unauthorised to perform this operation");
    }
    if (limit == 0) {
      throw new ApolloError("Provide a valid limit");
    }

    const docs = await Notification.find({})
      .populate("order")
      .populate("user")
      .populate({
        path: "order",
        populate: {
          path: "orderItems",
          populate: {
            path: "category",
            model: "Category",
          },
        },
      })
      .populate({
        path: "order",
        populate: {
          path: "orderItems",
          populate: {
            path: "restaurant",
            model: "Restaurant",
          },
        },
      })
      .populate({
        path: "order",
        populate: {
          path: "orderItems",
          populate: {
            path: "customer",
            model: "User",
          },
        },
      });
    // .populate({
    //   path: "order",
    //   populate: {
    //     path: "category",
    //     model: "Category",
    //   },
    // });
    const docsCount = await Notification.count();
    const totalPages = Math.ceil(docsCount / limit);
    const currentPage = Math.ceil(docsCount % (skip + 1));

    return {
      status: 0,
      notifications: docs,
      success: true,
      currentPage: currentPage == 0 ? currentPage + 1 : currentPage,
      totalPages,
      hasMore: docsCount >= limit + 1,
    };
  } catch (error) {
    console.log(
      `[ERROR]: Failed to get Notification details | ${error.message}`
    );
    throw new ApolloError("Failed to get Notification details");
  }
};

module.exports = getAllNotification;
