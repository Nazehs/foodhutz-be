const { ApolloError, AuthenticationError } = require("apollo-server-express");
const {
  BankDetails,
  User,
  Restaurant,
  Driver,
  StoreOwner,
} = require("../../models");

const deleteBankDetails = async (_, { bankId }, { user }) => {
  try {
    if (!user) {
      throw new AuthenticationError("Unauthorised to perform this operation");
    }
    const doc = await BankDetails.findByIdAndDelete(bankId);
    if (user.userType === "USER") {
      await User.findByIdAndUpdate(user.id, {
        $pull: { bankDetails: doc._id },
      });
    }
    if (user.userType === "RESTAURANT") {
      await StoreOwner.findByIdAndUpdate(user.id, {
        $pull: { bankDetails: doc._id },
      });
    }
    if (user.userType === "DRIVER") {
      await Driver.findByIdAndUpdate(user.id, {
        $pull: { bankDetails: doc._id },
      });
    }
    return doc;
  } catch (error) {
    console.log(`[ERROR]: Failed to delete bankDetails | ${error.message}`);
    throw new ApolloError("Failed to delete bankDetails");
  }
};
module.exports = deleteBankDetails;
