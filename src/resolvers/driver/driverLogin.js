const { AuthenticationError } = require("apollo-server-express");

const { Driver } = require("../../models");
const { signToken } = require("../../utils/auth");

const driverLogin = async (_, { input }) => {
  try {
    let user;
    if (input.email) {
      user = await Driver.findOne({ email: input.email });
    }

    if (input.phoneNumber) {
      user = await Driver.findOne({ phoneNumber: input.phoneNumber });
    }

    if (!user) {
      console.log("[ERROR]: Failed to login | User does not exist");
      throw new AuthenticationError("Failed to login");
    }
    const isValidPassword = await user.checkPassword(input.password);

    if (!isValidPassword) {
      console.log("[ERROR]: Failed to login | Incorrect password");
      throw new AuthenticationError("Failed to login");
    }

    return {
      token: signToken(user),
      user,
    };
  } catch (error) {
    console.log(`[ERROR]: Failed to login | ${error.message}`);
    throw new AuthenticationError("Failed to login");
  }
};

module.exports = driverLogin;
