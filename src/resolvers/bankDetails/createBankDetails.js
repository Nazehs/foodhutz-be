const { ApolloError, AuthenticationError } = require("apollo-server-express");
const { BankDetails, User, StoreOwner, Driver } = require("../../models");

const createBankDetails = async (_, { input }, { user }) => {
  try {
    if (!user) {
      throw new AuthenticationError("Unauthorised to perform this operation");
    }
    const doc = await BankDetails.create(input);
    if (user.userType.toUpperCase() === "USER") {
      await User.findByIdAndUpdate(user.id, {
        $push: { bankDetails: doc._id },
      });
    }
    if (user.userType.toUpperCase() === "RESTAURANT") {
      await StoreOwner.findByIdAndUpdate(user.id, {
        $push: { bankDetails: doc._id },
      });
    }
    if (user.userType.toUpperCase() === "DRIVER") {
      await Driver.findByIdAndUpdate(user.id, {
        $push: { bankDetails: doc._id },
      });
    }
    return doc;
  } catch (error) {
    console.log(`[ERROR]: Failed to create bank details | ${error.message}`);
    throw new ApolloError("Failed to create bank details");
  }
};
module.exports = createBankDetails;
