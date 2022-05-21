const { ApolloError, AuthenticationError } = require("apollo-server-express");
const { default: mongoose } = require("mongoose");

const { Driver } = require("../../models");

const getDriverStats = async (_, __, { user }) => {
  try {
    if (!user) {
      throw new AuthenticationError("Unauthorised to perform this operation");
    }
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
      { $unwind: { path: "$trips", preserveNullAndEmptyArrays: true } },
      { $sort: { "trips.createdAt": 1 } },
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
              $match: {
                "trips.status": "accepted",
              },
            },
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
            {
              $project: {
                totalAmt: { $round: ["$totalAmt", 2] },
                count: 1,
                day: "$_id",
                _id: 0,
              },
            },
          ],
          categorizedByYear: [
            { $unwind: "$trips" },
            {
              $match: {
                "trips.status": "accepted",
                createdAt: {
                  $gte: new Date("2022-04-04T10:30:00.000Z"),
                },
              },
            },
            {
              $group: {
                _id: {
                  $year: "$trips.createdAt",
                },
                // year: { $year: "$trips.createdAt" },

                count: { $sum: 1 },
                totalAmt: {
                  $sum: "$trips.amount",
                },
              },
            },
            {
              $project: {
                totalAmt: { $round: ["$totalAmt", 2] },
                count: 1,
                year: "$_id",
                _id: 0,
              },
            },
          ],
          categorizedByWeek: [
            { $unwind: "$trips" },
            {
              $match: {
                "trips.status": "accepted",
              },
            },
            {
              $match: {
                "trips.status": "accepted",
              },
            },
            {
              $group: {
                _id: {
                  year: { $year: "$trips.createdAt" },
                  week: { $week: "$trips.createdAt" },
                },
                count: { $sum: 1 },
                totalAmt: {
                  $sum: "$trips.amount",
                },
              },
            },
            {
              $project: {
                totalAmt: { $round: ["$totalAmt", 2] },
                count: 1,
                week: "$_id",
                _id: 0,
              },
            },
          ],
          categorizedByMonth: [
            { $unwind: "$trips" },
            {
              $match: {
                "trips.status": "accepted",
              },
            },
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
            {
              $project: {
                month: "$_id",
                _id: 0,
                count: 1,
                totalAmt: 1,
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

            { $match: { "trips.status": "cancelled" } },

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

    return doc[0];
  } catch (error) {
    console.log(`[ERROR]: Failed to get aggregate details | ${error.message}`);
    throw new ApolloError(
      `Failed to get aggregate details || ${error.message} `
    );
  }
};

module.exports = getDriverStats;
