const { ApolloError, AuthenticationError } = require("apollo-server-express");
const { StoreOwner, Driver, User } = require("../../models");
const { signToken } = require("../../utils/auth");
const { sentSMS } = require("../../utils/sms");
const createStoreOwner = async (_, { input }) => {
  try {
    const isUserExisting =
      (await Driver.findOne({ email: input.email })) ||
      (await User.findOne({ email: input.email })) ||
      (await StoreOwner.findOne({ email: input.email }));
    if (!isUserExisting) {
      await sentSms(input.phoneNumber);
      const user = await await StoreOwner.create(input);
      return {
        token: signToken(user),
        user,
      };
    }
    throw new ApolloError("Failed to sign up. user already exist");
  } catch (error) {
    console.log(`[ERROR]: Failed to create StoreOwner | ${error.message}`);
    throw new ApolloError("Failed to create StoreOwner");
  }
};

module.exports = createStoreOwner;
