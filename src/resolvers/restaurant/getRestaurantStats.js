const { ApolloError, AuthenticationError } = require("apollo-server-express");
const { default: mongoose } = require("mongoose");

const { StoreOwner } = require("../../models");

const getStoreOwnerAggregate = async (_, { startDate, endDate }, { user }) => {
  try {
    if (!user) {
      throw new AuthenticationError("Unauthorised to perform this operation");
    }

    const doc = await StoreOwner.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(user.id) } },
      {
        $lookup: {
          from: "orders",
          localField: "orders",
          foreignField: "_id",
          let: { orders: "$orders" },
          pipeline: [{ $sort: { createdAt: -1 } }],
          as: "orders",
        },
      },
      { $unwind: { path: "$orders", preserveNullAndEmptyArrays: true } },
      {
        $replaceRoot: {
          newRoot: {
            $mergeObjects: [{ $arrayElemAt: ["$fromItems", 0] }, "$$ROOT"],
          },
        },
      },
      { $sort: { "orders.createdAt": -1 } },
      {
        $facet: {
          categorizedByDay: [
            { $unwind: "$orders" },
            {
              $group: {
                _id: {
                  $dateToString: {
                    format: "%Y-%m-%d",
                    date: "$orders.orderTime",
                  },
                },
                count: { $sum: 1 },
                totalAmt: {
                  $sum: "$orders.finalPrice",
                },
              },
            },
            {
              $project: {
                _id: 0,
                day: "$_id",
                count: 1,
                totalAmt: 1,
              },
            },
          ],
          categorizedByMonth: [
            { $unwind: "$orders" },
            {
              $group: {
                _id: {
                  month: { $month: "$orders.orderTime" },
                  day: { $dayOfMonth: "$orders.orderTime" },
                  year: { $year: "$orders.orderTime" },
                },
                count: { $sum: 1 },
                totalAmt: {
                  $sum: "$orders.finalPrice",
                },
              },
            },
            {
              $project: {
                _id: 0,
                month: {
                  month: "$_id.month",
                  day: "$_id.day",
                  year: "$_id.year",
                },
                count: 1,
                totalAmt: 1,
              },
            },
          ],
          // total accepted order
          totalAmountAccepted: [
            { $unwind: "$orders" },

            { $match: { "orders.orderStatus": "accepted" } },

            {
              $project: {
                total: "$orders.finalPrice",
              },
            },
            {
              $group: {
                _id: null,
                totalAmt: { $sum: "$total" },
                count: { $sum: 1 },
              },
            },
            {
              $project: {
                totalAmt: { $round: ["$totalAmt", 2] },
                count: 1,
                _id: 0,
              },
            },
          ],
          // total processed
          totalProcessed: [
            { $unwind: "$orders" },

            { $match: { "orders.orderStatus": "processed" } },

            { $project: { total: "$orders.finalPrice" } },
            {
              $group: {
                _id: null,
                totalAmt: { $sum: "$total" },
                count: { $sum: 1 },
              },
            },
            {
              $project: {
                totalAmt: { $round: ["$totalAmt", 2] },
                count: 1,
                _id: 0,
              },
            },
          ],
          // total cancelled
          totalCancelled: [
            { $unwind: "$orders" },

            { $match: { "orders.orderStatus": "cancelled" } },

            { $project: { total: "$orders.finalPrice" } },
            {
              $group: {
                _id: null,
                totalAmt: { $sum: "$total" },
                count: { $sum: 1 },
              },
            },
            {
              $project: {
                totalAmt: { $round: ["$totalAmt", 2] },
                count: 1,
                _id: 0,
              },
            },
          ],
          // total missed orders
          totalMissed: [
            { $unwind: "$orders" },

            { $match: { "orders.orderStatus": "missed" } },

            { $project: { total: "$orders.finalPrice" } },
            {
              $group: {
                _id: null,
                totalAmt: { $sum: "$total" },
                count: { $sum: 1 },
              },
            },
            {
              $project: {
                totalAmt: { $round: ["$totalAmt", 2] },
                count: 1,
                _id: 0,
              },
            },
          ],
          // total orders and counts
          totalOrders: [
            { $unwind: "$orders" },

            {
              $match: {
                "orders.orderStatus": {
                  $in: [
                    "New",
                    "accepted",
                    "processed",
                    "completed",
                    "cancelled",
                    "missed",
                  ],
                },
              },
            },

            { $project: { total: "$orders.finalPrice" } },
            {
              $group: {
                _id: null,
                totalAmt: { $sum: "$total" },
                count: { $sum: 1 },
              },
            },
            {
              $project: {
                totalAmt: { $round: ["$totalAmt", 2] },
                count: 1,
                _id: 0,
              },
            },
          ],
        },
      },
    ]);
    return doc[0];
  } catch (error) {
    console.log(`[ERROR]: Failed to get aggregate details | ${error.message}`);
    throw new ApolloError(`Failed to get aggregate details ${error.message}`);
  }
};

module.exports = getStoreOwnerAggregate;
