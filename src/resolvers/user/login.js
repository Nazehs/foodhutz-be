const { AuthenticationError } = require("apollo-server-express");

const { User } = require("../../models");
const { signToken } = require("../../utils/auth");

const login = async (_, { input }) => {
  try {
    let user;
    console.log(input);
    if (input.email) {
      user = await User.findOne({ email: input.email });
    }

    if (input.phoneNumber) {
      user = await User.findOne({ phoneNumber: input.phoneNumber });
    }

    if (!user) {
      console.log("[ERROR]: Failed to login | User does not exist");
      throw new AuthenticationError("Failed to login");
    }
    console.log(user);
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

module.exports = login;
