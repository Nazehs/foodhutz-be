const { ApolloError, AuthenticationError } = require("apollo-server-express");

const { StoreOwner, User, Driver } = require("../../models");

const getMyNotifications = async (_, { limit = 10, skip = 0 }, { user }) => {
  try {
    if (!user) {
      throw new AuthenticationError("Unauthorised to perform this operation");
    }
    let docs;
    if (user.userType === "USER") {
      docs = await User.findById(user.id)
        .populate("notifications")
        .populate("user")
        .populate("order")
        .sort("desc");
    }
    if (user.userType === "RESTAURANT") {
      docs = await StoreOwner.findById(user.id)
        .populate("notifications")
        .populate("user")
        .populate("order")
        .sort("desc");
    }
    if (user.userType === "DRIVER") {
      docs = await Driver.findById(user.id)
        .populate("notifications")
        .populate("user")
        .populate("order")
        .sort("desc");
    }
    const notificationsCount = docs.notifications.length;
    console.log(user);
    console.log(docs);

    const totalPages = Math.ceil(notificationsCount / limit);
    const currentPage = Math.ceil(notificationsCount % (skip + 1));
    return {
      status: 0,
      success: true,
      currentPage: currentPage == 0 ? currentPage + 1 : currentPage,
      totalPages,
      hasMore: notificationsCount >= limit + 1,
      notifications: docs.notifications,
    };
  } catch (error) {
    console.log(
      `[ERROR]: Failed to get my notification  details| ${error.message}`
    );
    throw new ApolloError("Failed to get notification details");
  }
};

module.exports = getMyNotifications;
