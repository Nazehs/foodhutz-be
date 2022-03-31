const { ApolloError, AuthenticationError } = require("apollo-server-express");

const { Notification } = require("../../models");

const getNotification = async (_, { notificationId }, { user }) => {
  try {
    if (!user) {
      throw new AuthenticationError("Unauthorised to perform this operation");
    }

    return await Notification.findById(notificationId)
      .populate("order")
      .populate("user")
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
      });
  } catch (error) {
    console.log(
      `[ERROR]: Failed to get notification details| ${error.message}`
    );
    throw new ApolloError("Failed to get notification details");
  }
};

module.exports = getNotification;
