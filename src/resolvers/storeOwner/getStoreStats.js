const { ApolloError, AuthenticationError } = require("apollo-server-express");
const { default: mongoose } = require("mongoose");

const { StoreOwner } = require("../../models");

const getStoreOwnerAggregate = async (_, __, { user }) => {
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
          as: "orders",
        },
      },
      { $unwind: { path: "$orders", preserveNullAndEmptyArrays: true } },
      { $sort: { "orders.createdAt": 1 } },
      {
        $replaceRoot: {
          newRoot: {
            $mergeObjects: [{ $arrayElemAt: ["$fromItems", 0] }, "$$ROOT"],
          },
        },
      },
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

            { $match: { "orders.orderStatus": { $in: ["New", "accepted"] } } },

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
