const { ApolloError, AuthenticationError } = require("apollo-server-express");
const { Payment, Driver, StoreOwner } = require("../../models");

const createPayment = async (_, { input }, { user }) => {
  try {
    if (!user) {
      throw new AuthenticationError("Unauthorised to perform this operation");
    }
    let userData;

    if (user.userType.toUpperCase() === "RESTAURANT") {
      input.restaurant = user.id;
      userData = await StoreOwner.findById(user.id);
    }
    if (user.userType.toUpperCase() === "DRIVER") {
      input.driver = user.id;
      userData = await Driver.findById(user.id);
    }

    input.email = user.email;
    const { wallet } = userData;
    // TODO:
    // check if the user has upto the requested amount before proceeding otherwise throw error
    // initiate 3PP payment request
    //

    if (input.amount >= wallet) {
      const doc = await Payment.create(input);
      // update the payment status after the completion of the payment

      // add the transaction to user invoices
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
    } else {
      throw new ApolloError(`Failed to payment || ${error.message}`);
    }
  } catch (error) {
    console.log(`[ERROR]: Failed to payment | ${error.message}`);
    throw new ApolloError(`Failed to payment || ${error.message}`);
  }
};
module.exports = createPayment;
