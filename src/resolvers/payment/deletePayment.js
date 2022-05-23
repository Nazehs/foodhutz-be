const { ApolloError, AuthenticationError } = require("apollo-server-express");
const { Payment, StoreOwner } = require("../../models");

const deletePayment = async (_, { paymentId }, { user }) => {
  try {
    if (!user) {
      throw new AuthenticationError("Unauthorised to perform this operation");
    }

    const doc = await Payment.findByIdAndDelete(paymentId)
      .populate("bankDetails")
      .populate("driver")
      .populate("restaurant");
    if (user.userType.toUpperCase() === "RESTAURANT") {
      await StoreOwner.findByIdAndUpdate(user.id, {
        $pull: { invoices: doc._id },
      });
    }
    if (user.userType.toUpperCase() === "DRIVER") {
      await Driver.findByIdAndUpdate(user.id, {
        $pull: { invoices: doc._id },
      });
    }
    return doc;
  } catch (error) {
    console.log(`[ERROR]: Failed to delete payment details | ${error.message}`);
    throw new ApolloError(
      `Failed to delete payment details || ${error.message}`
    );
  }
};
module.exports = deletePayment;
