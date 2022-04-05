const { ApolloError, AuthenticationError } = require("apollo-server-express");
const {
  Order,
  Restaurant,
  StoreOwner,
  Trip,
  Driver,
  Notification,
} = require("../../models");

const orderControl = async (_, { orderId, status }, { user }) => {
  try {
    if (!user) {
      throw new AuthenticationError("Unauthorised to perform this operation");
    }
    const doc = await Order.findByIdAndUpdate(
      orderId,
      {
        orderStatus: status,
      },
      { new: true }
    );
    if (status.toLowerCase() == "accepted") {
      // fire for driver/dispatch request/notification
      console.log(doc);
      const trip = {
        to: doc?.deliveryAddress,
        orderStatus: status,
        duration: doc?.deliveryAddress,
        order: doc._id,
        tip: 0,
        distance: "30 KM",
        from: doc?.orderItems[0]?.restaurantAddress || " No address",
      };
      //   create a trip
      const tripDoc = await Trip.create(trip);
      //   create a notification
      const notificationDoc = await Notification.create({
        message: "New order available for you",
        user: doc.user,
        order: doc.order,
      });
      //   push notifications to driver list of notification
      await Driver.updateMany(
        {},
        { $push: { notifications: notificationDoc._id } }
      );
      console.log(tripDoc);
    }

    return doc;
  } catch (error) {
    console.log(`[ERROR]: Failed to update  order | ${error.message}`);
    throw new ApolloError("Failed to update  order status");
  }
};
module.exports = orderControl;
