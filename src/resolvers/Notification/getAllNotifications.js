const { ApolloError, AuthenticationError } = require("apollo-server-express");

const { Notification } = require("../../models");

const getAllNotification = async (_, __, { user }) => {
  try {
    if (!user) {
      throw new AuthenticationError("Unauthorised to perform this operation");
    }

    return {
      status: 0,
      menus: await Notification.find({}),
      messages: "success",
    };
  } catch (error) {
    console.log(
      `[ERROR]: Failed to get Notification details | ${error.message}`
    );
    throw new ApolloError("Failed to get Notification details");
  }
};

module.exports = getAllNotification;
