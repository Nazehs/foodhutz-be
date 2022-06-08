const { ApolloError } = require("apollo-server-express");
const { Driver, User } = require("../../models");
const { signToken } = require("../../utils/auth");
const { sentSMS } = require("../../utils/sms");

const driverSignup = async (_, { input }) => {
  try {
    const isUserExisting =
      (await Driver.findOne({ email: input.email })) ||
      (await User.findOne({ email: input.email }));
    if (!isUserExisting) {
      await sentSMS(input.phoneNumber);
      //  set up stripe account and profile to the user
      const user = await Driver.create(input);
      return {
        token: signToken(user),
        user,
      };
    }
    throw new ApolloError("Failed to sign up user already exist");
  } catch (error) {
    console.log(`[ERROR]: Failed to sign up | ${error.message}`);
    throw new ApolloError(`Failed to sign up || ${error.message}`);
  }
};

module.exports = driverSignup;
