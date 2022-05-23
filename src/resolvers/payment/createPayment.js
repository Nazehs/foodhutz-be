const { ApolloError, AuthenticationError } = require("apollo-server-express");
const { Payment, Driver, StoreOwner } = require("../../models");

const createPayment = async (_, { input }, { user }) => {
  try {
    if (!user) {
      throw new AuthenticationError("Unauthorised to perform this operation");
    }
    if (user.userType.toUpperCase() === "RESTAURANT") {
      input.restaurant = user.id;
    }
    if (user.userType.toUpperCase() === "DRIVER") {
      input.driver = user.id;
    }
    input.email = user.email;

    const doc = await Payment.create(input);

    if (user.userType.toUpperCase() === "RESTAURANT") {
      await StoreOwner.findByIdAndUpdate(user.id, {
        $push: { invoices: doc._id },
      });
    }
    if (user.userType.toUpperCase() === "DRIVER") {
      await Driver.findByIdAndUpdate(user.id, {
        $push: { invoices: doc._id },
      });
    }

    return Payment.findById(doc._id)
      .populate("bankDetails")
      .populate("driver")
      .populate("restaurant");
  } catch (error) {
    console.log(`[ERROR]: Failed to payment | ${error.message}`);
    throw new ApolloError(`Failed to payment || ${error.message}`);
  }
};
module.exports = createPayment;
