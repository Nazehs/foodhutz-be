const { ApolloError, AuthenticationError } = require("apollo-server-express");

const { Notification } = require("../../models");

const updateNotification = async (_, { notificationId, input }, { user }) => {
  try {
    if (!user) {
      throw new AuthenticationError("Unauthorised to perform this operation");
    }

    return await Notification.findByIdAndUpdate(notificationId, input, {
      new: true,
    })
      .populate("user")
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
      `[ERROR]: Failed to update Notification  details | ${error.message}`
    );
    throw new ApolloError("Failed to update Notification details");
  }
};

module.exports = updateNotification;
