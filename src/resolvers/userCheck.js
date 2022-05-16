const { ApolloError, AuthenticationError } = require("apollo-server-express");
const { User, StoreOwner, Driver } = require("../models");

const checkUserExist = async (_, { input }) => {
  try {
    let doc;
    if (input.userType.toUpperCase() === "RESTAURANT") {
      doc = await StoreOwner.findOne({ email: input.email });
    }
    if (input.userType.toUpperCase() === "DRIVER") {
      doc = await Driver.findOne({ email: input.email });
    }
    if (input.userType.toUpperCase() === "USER") {
      doc = await User.findOne({ email: input.email });
    }
    if (doc) {
      return {
        status: 0,
        success: true,
        isUserExisting: true,
        message: "User is already in the system",
      };
    } else {
      return {
        status: 0,
        success: true,
        isUserExisting: false,
        message: "User is not created in the created",
      };
    }
  } catch (error) {
    console.log(`[ERROR]: Failed to update status | ${error.message}`);
    throw new ApolloError(`Failed to update status || ${error.message}`);
  }
};

module.exports = checkUserExist;
