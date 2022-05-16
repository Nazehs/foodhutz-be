const { ApolloError, AuthenticationError } = require("apollo-server-express");
const { default: mongoose } = require("mongoose");
const { Driver } = require("../../models");

const getMyTrips = async (_, { limit = 10, skip = 0, status }, { user }) => {
  try {
    if (!user) {
      throw new AuthenticationError("Unauthorised to perform this operation");
    }
    let docs;
    if (status) {
      docs = await Driver.aggregate([
        { $match: { _id: new mongoose.Types.ObjectId(user.id) } },
        {
          $lookup: {
            from: "trips",
            localField: "trips",
            foreignField: "_id",
            pipeline: [
              { $match: { status } },
              { $replaceRoot: { newRoot: "$$ROOT" } },
            ],
            as: "trips",
          },
        },
      ]);
      docs = docs[0];
    } else {
      docs = await Driver.findById(user.id)
        .populate("trips")
        .populate({
          path: "trips",
          populate: {
            path: "order",
            model: "Order",
          },
        });
    }

    const tripsCount = docs.trips.length;

    const totalPages = Math.ceil(tripsCount / limit);
    const currentPage = Math.ceil(tripsCount % (skip + 1));
    return {
      status: 0,
      success: true,
      currentPage: currentPage == 0 ? currentPage + 1 : currentPage,
      totalPages: totalPages == 0 ? totalPages + 1 : totalPages,
      hasMore: tripsCount >= limit + 1,
      trips: docs.trips,
    };

    // return await Trip.findById(user.id).populate("order");
  } catch (error) {
    console.log(`[ERROR]: Failed get trip my details | ${error.message}`);
    throw new ApolloError(`Failed get trip details  || ${error.message}`);
  }
};

module.exports = getMyTrips;
