const { ApolloError, AuthenticationError } = require("apollo-server-express");

const { StoreOwner, Driver } = require("../models");

const updateOnlineStatus = async (_, { status }, { user }) => {
  try {
    if (!user) {
      throw new AuthenticationError("Unauthorised to perform this operation");
    }

    if (user.userType.toUpperCase() === "RESTAURANT") {
      await StoreOwner.findByIdAndUpdate(user.id, {
        status,
      });
    }
    if (user.userType.toUpperCase() === "DRIVER") {
      await Driver.findByIdAndUpdate(user.id, {
        status,
      });
    }

    return {
      status: 0,
      success: true,
      message: "user status changed successfully",
    };
  } catch (error) {
    console.log(`[ERROR]: Failed to update status | ${error.message}`);
    throw new ApolloError(`Failed to update status || ${error.message}`);
  }
};

module.exports = updateOnlineStatus;
