const { ApolloError } = require("apollo-server-express");
const { User } = require("../../models");
const { signToken } = require("../../utils/auth");
const { generateOTP } = require("../../utils/generateOTP");
const { sentSMS } = require("../../utils/sms");

const signup = async (_, { input }) => {
  try {
    const isUserExisting = await User.findOne({ email: input.email });
    if (!isUserExisting) {
      const user = await User.create(input);
      return {
        token: signToken(user),
        user,
      };
    }
    throw new ApolloError("Failed to sign up");
  } catch (error) {
    console.log(`[ERROR]: Failed to sign up | ${error.message}`);
    throw new ApolloError("Failed to sign up");
  }
};

module.exports = signup;
