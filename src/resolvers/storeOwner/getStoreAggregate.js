const { ApolloError, AuthenticationError } = require("apollo-server-express");
const { default: mongoose } = require("mongoose");

const { StoreOwner } = require("../../models");

const getAggregate = async (_, __, { user }) => {
  try {
    // if (!user) {
    //   throw new AuthenticationError("Unauthorised to perform this operation");
    // }

    return await StoreOwner.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(user.id) } },
      {
        $lookup: {
          from: "orders",
          localField: "orders",
          foreignField: "_id",
          as: "orders",
        },
      },
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
                totalSales: {
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
                totalSales: {
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

    // console.log(JSON.stringify(doc));

    // return doc;
  } catch (error) {
    console.log(`[ERROR]: Failed to get aggregate details | ${error.message}`);
    throw new ApolloError("Failed to get aggregate details ");
  }
};

module.exports = getAggregate;
