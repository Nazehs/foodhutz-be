const { ApolloError, AuthenticationError } = require("apollo-server-express");
const { Payment, Driver, StoreOwner } = require("../../models");
const {
  payoutUser,
  getCustomerStripeBalance,
} = require("./stripePaymentHelpers");

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
    const balance = await getCustomerStripeBalance(user);

    const { amount, currency } = balance.available[0];

    if (input.amount <= wallet && amount >= wallet) {
      const doc = await Payment.create(input);

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

      const payout = await payoutUser({
        amount: input.amount,
        currency,
        stripe_account: userData.stripeAccountId,
      });

      return Payment.findByIdAndUpdate(
        doc._id,
        {
          $set: { paymentRef: payout.id },
        },
        { new: true }
      )
        .populate("bankDetails")
        .populate("driver")
        .populate("restaurant");
    } else {
      throw new ApolloError(
        `Failed to payment you don't have enough balance in your wallet`
      );
    }
  } catch (error) {
    console.log(`[ERROR]: Failed to payment | ${error.message}`);
    throw new ApolloError(`Failed to payment || ${error.message}`);
  }
};
module.exports = createPayment;
