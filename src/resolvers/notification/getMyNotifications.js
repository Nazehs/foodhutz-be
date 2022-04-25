const { ApolloError, AuthenticationError } = require("apollo-server-express");

const { Notification } = require("../../models");

const getMyNotifications = async (_, __, { user }) => {
  try {
    if (!user) {
      throw new AuthenticationError("Unauthorised to perform this operation");
    }

    return await Notification.findById(user.id)
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
      `[ERROR]: Failed to get my notification  details| ${error.message}`
    );
    throw new ApolloError("Failed to get notification details");
  }
};

module.exports = getMyNotifications;
