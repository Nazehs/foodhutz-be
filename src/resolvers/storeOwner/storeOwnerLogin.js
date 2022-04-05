const { AuthenticationError } = require("apollo-server-express");

const { StoreOwner } = require("../../models");
const { signToken } = require("../../utils/auth");

const storeOwnerLogin = async (_, { input }) => {
  try {
    let user;
    if (input.email) {
      user = await StoreOwner.findOne({ email: input.email });
    }

    if (input.phoneNumber) {
      user = await StoreOwner.findOne({ phoneNumber: input.phoneNumber });
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
    throw new AuthenticationError("Failed to login yeah");
  }
};

module.exports = storeOwnerLogin;
