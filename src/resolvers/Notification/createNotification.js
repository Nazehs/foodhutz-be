const { ApolloError } = require("apollo-server-express");
const { Notification } = require("../../models");

const createNotification = async (_, { input }) => {
  try {
    return await Notification.create(input);
  } catch (error) {
    console.log(`[ERROR]: Failed to create a Notification | ${error.message}`);
    throw new ApolloError("Failed to create a Notification");
  }
};

module.exports = createNotification;
