const { ApolloError } = require("apollo-server-express");
const { User } = require("../../models");
const { signToken } = require("../../utils/auth");
// const { generateOTP } = require("../../utils/generateOTP");
// const { sentSMS } = require("../../utils/sms");

const signup = async (_, { input }) => {
  try {
    const isUserExisting = await User.findOne({ email: input.email });
    if (!isUserExisting) {
      const user = User.create(input).then((user) => user);
      return {
        token: signToken(user),
        user,
      };
    } else {
      throw new ApolloError("Failed to sign up user already exist");
    }
  } catch (error) {
    console.log(`[ERROR]: Failed to sign up | ${error.message}`);
    throw new ApolloError(`Failed to sign up || ${error.message}`);
  }
};

module.exports = signup;
