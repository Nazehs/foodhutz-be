const { ApolloError, AuthenticationError } = require("apollo-server-express");
const { default: mongoose } = require("mongoose");

const { Driver } = require("../../models");

const getDriverStats = async (_, __, { user }) => {
  try {
    if (!user) {
      throw new AuthenticationError("Unauthorised to perform this operation");
    }
    // console.log(user);

    const doc = await Driver.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(user.id) } },
      {
        $lookup: {
          from: "trips",
          localField: "trips",
          foreignField: "_id",
          as: "trips",
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
            { $unwind: "$trips" },
            {
              $group: {
                _id: {
                  $dateToString: {
                    format: "%Y-%m-%d",
                    date: "$trips.createdAt",
                  },
                },
                count: { $sum: 1 },
                totalAmt: {
                  $sum: "$trips.amount",
                },
              },
            },
          ],
          categorizedByMonth: [
            { $unwind: "$trips" },
            {
              $group: {
                _id: {
                  month: { $month: "$trips.createdAt" },
                  day: { $dayOfMonth: "$trips.createdAt" },
                  year: { $year: "$trips.createdAt" },
                },
                count: { $sum: 1 },
                totalAmt: {
                  $sum: "$trips.amount",
                },
              },
            },
          ],
          // total accepted order
          totalAmountAccepted: [
            { $unwind: "$trips" },

            { $match: { "trips.status": "accepted" } },

            {
              $project: {
                total: "$trips.amount",
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
            { $unwind: "$trips" },

            { $match: { "trips.status": "processed" } },

            { $project: { total: "$trips.amount" } },
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
            { $unwind: "$trips" },

            { $match: { "trips.tripstatus": "cancelled" } },

            { $project: { total: "$trips.amount" } },
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
          // total missed trips
          totalMissed: [
            { $unwind: "$trips" },

            { $match: { "trips.status": "missed" } },

            { $project: { total: "$trips.amount" } },
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
          // total trips and counts
          totalTrips: [
            { $unwind: "$trips" },

            { $match: { "trips.status": { $in: ["accepted"] } } },

            { $project: { total: "$trips.amount" } },
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
    console.log(JSON.stringify(doc));

    return doc[0];
  } catch (error) {
    console.log(`[ERROR]: Failed to get aggregate details | ${error.message}`);
    throw new ApolloError("Failed to get aggregate details ");
  }
};

module.exports = getDriverStats;
