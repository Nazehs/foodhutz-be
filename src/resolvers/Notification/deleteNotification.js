const { ApolloError, AuthenticationError } = require("apollo-server-express");

const { Notification } = require("../../models");

const deleteNotification = async (_, { notificationId }, { user }) => {
  try {
    if (!user) {
      throw new AuthenticationError("Unauthorised to perform this operation");
    }

    return await Notification.findByIdAndDelete(notificationId);
  } catch (error) {
    console.log(
      `[ERROR]: Failed to delete Notification  details | ${error.message}`
    );
    throw new ApolloError("Failed to delete Notification details");
  }
};

module.exports = deleteNotification;
