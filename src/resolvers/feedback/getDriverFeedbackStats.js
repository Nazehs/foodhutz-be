const { ApolloError, AuthenticationError } = require("apollo-server-express");
const { default: mongoose } = require("mongoose");

const { Feedback } = require("../../models");

const getDriverFeedbackStats = async (_, __, { user }) => {
  try {
    if (!user) {
      throw new AuthenticationError("Unauthorised to perform this operation");
    }

    const doc = await Feedback.aggregate([
      { $match: { driver: new mongoose.Types.ObjectId(user.id) } },

      {
        $lookup: {
          from: "orders",
          localField: "order",
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
          // average stars of the user
          avgFeedback: [
            {
              $group: {
                _id: null,
                avg: { $avg: "$stars" },
                count: { $sum: 1 },
              },
            },
            {
              $project: {
                count: 1,
                avgStars: { $round: ["$avg", 2] },
                _id: 0,
              },
            },
          ],
          // categories based on star
          starsCategory: [
            {
              $group: {
                _id: "$stars",
                count: { $sum: 1 },
              },
            },
            {
              $project: {
                count: 1,
                stars: "$_id",
                _id: 0,
              },
            },
          ],
          // total processed
          totalDelivered: [
            { $unwind: "$orders" },

            { $match: { "orders.orderStatus": "accepted" } },
            {
              $group: {
                _id: null,
                count: { $sum: 1 },
              },
            },
            {
              $project: {
                count: 1,
                _id: 0,
              },
            },
          ],
          // total cancelled
          totalCancelled: [
            { $unwind: "$orders" },

            { $match: { "orders.orderStatus": "accepted" } },
            {
              $group: {
                _id: null,
                count: { $sum: 1 },
              },
            },
            {
              $project: {
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
                    "delivered",
                    "cancelled",
                    "missed",
                    "processed",
                    "accepted",
                  ],
                },
              },
            },
            {
              $group: {
                _id: null,
                count: { $sum: 1 },
              },
            },
            {
              $project: {
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

module.exports = getDriverFeedbackStats;
