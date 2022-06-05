const { ApolloError } = require("apollo-server-express");
const { User } = require("../models");
const { sentSMS } = require("../utils/sms");
const driverPasswordReset = async (_, { email, userType }) => {
  try {
    if (email && userType) {
      let user;
      if (userType.toLowerCase() === "driver") {
        user = await User.find({ email });
        if (user) {
          await sentSMS(user.phoneNumber);
        }
        throw new ApolloError("Failed to reset password");
      }
      if (userType.toLowerCase() === "restaurant") {
        {
          user = await User.find({ email });
          if (user) {
            await sentSMS(user.phoneNumber);
          }
        }

        if (userType.toLowerCase() === "user") {
          user = await User.find({ email });
          if (user) {
            await sentSMS(user.phoneNumber);
          }
          throw new ApolloError("Failed to reset password");
        }
        if (user) {
          return {
            message: "Password reset link has been sent to your email",
            status: 0,
            success: true,
          };
        } else {
          return {
            message: "Oops there is no user with this email",
            status: 1,
            success: false,
          };
        }
      }
    }
  } catch (error) {
    console.log(`[ERROR]: Failed to reset password | ${error.message}`);
    throw new ApolloError(`Failed to reset password ||${error.message} `);
  }
};

module.exports = driverPasswordReset;
