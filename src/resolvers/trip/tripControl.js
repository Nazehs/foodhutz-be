const { ApolloError, AuthenticationError } = require("apollo-server-express");
const { Order, Trip, Driver } = require("../../models");

const tripControl = async (_, { tripId, status }, { user }) => {
  try {
    console.log(tripId, status);
    if (!user) {
      throw new AuthenticationError("Unauthorised to perform this operation");
    }

    if (status.toLowerCase() == "accepted") {
      // update the trip status
      const doc = await Trip.findByIdAndUpdate(
        tripId,
        {
          status,
        },
        { new: true }
      )
        .populate("order")
        .populate({
          path: "order",
          populate: {
            path: "orderItems",
            populate: { path: "category", model: "Category" },
          },
        })
        .populate({
          path: "order",
          populate: {
            path: "orderItems",
            populate: {
              path: "restaurant",
              model: "StoreOwner",
            },
          },
        })
        .populate({
          path: "order",
          populate: {
            path: "orderItems",
            populate: { path: "customer", model: "User" },
          },
        });
      //   update the order with the driver
      await Order.findByIdAndUpdate(doc.order, {
        $set: { deliveryBy: user.id },
      });

      console.log(doc);
      await Driver.findByIdAndUpdate(user.id, { $push: { trips: doc._id } });
      return doc;
    }
    // else{
    //   return await Driver.findByIdAndUpdate(user.id, { $pull: { notification: doc._id } });
    // }
  } catch (error) {
    console.log(`[ERROR]: Failed to update  trip | ${error.message}`);
    throw new ApolloError("Failed to update  trip status");
  }
};
module.exports = tripControl;
