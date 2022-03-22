const { ApolloError, AuthenticationError } = require("apollo-server-express");

const { Notification } = require("../../models");

const updateNotification = async (_, { otpId, input }, { user }) => {
  try {
    if (!user) {
      throw new AuthenticationError("Unauthorised to perform this operation");
    }

    return await Notification.findByIdAndUpdate(otpId, input, {
      new: true,
    }).populate("category");
  } catch (error) {
    console.log(
      `[ERROR]: Failed to update Notification  details | ${error.message}`
    );
    throw new ApolloError("Failed to update Notification details");
  }
};

module.exports = updateNotification;
