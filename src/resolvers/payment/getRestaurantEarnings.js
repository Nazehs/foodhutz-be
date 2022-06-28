const { ApolloError, AuthenticationError } = require("apollo-server-express");
const { default: mongoose } = require("mongoose");
const { Payment, StoreOwner } = require("../../models");

const getRestaurantEarnings = async (_, { startDate, endDate }, { user }) => {
  try {
    if (!user) {
      throw new AuthenticationError("Unauthorised to perform this operation");
    }
    let response = {};
    const payment = await Payment.aggregate([
      {
        $match: {
          restaurant: new mongoose.Types.ObjectId(user.id),
          // createdAt: { $gte: new Date(startDate), $lte: new Date(endDate) },
          // status: "Completed",
        },
      },
      {
        $group: {
          _id: null,
          totalPayout: { $sum: "$amount" },
          totalFees: { $sum: "$fees" },
        },
      },

      {
        $project: {
          _id: 0,
        },
      },
    ]);

    // const storeOwner = await StoreOwner.findById(user.id).populate("orders");
    // console.log(storeOwner.orders);

    const lastInvoice = await Payment.findOne({
      restaurant: new mongoose.Types.ObjectId(user.id),
    })
      .sort({ createdAt: -1 })
      .populate("bankDetails");

    response = Object.assign(response, {
      paymentSchedule: user.paymentSchedule,
      ...payment[0],
      nextPaymentDate: user.nextPaymentDate,
      invoice: lastInvoice,
    });

    console.log(response);
    return { status: 0, success: true, ...response };
  } catch (error) {
    console.log(`[ERROR]: Failed to get payment details | ${error.message}`);
    throw new ApolloError(`Failed to get payment details || ${error.message}`);
  }
};
module.exports = getRestaurantEarnings;
