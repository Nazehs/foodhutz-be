const { ApolloError, AuthenticationError } = require("apollo-server-express");
const { Order, Driver, Notification } = require("../../models");
const getTripMatrix = require("../../utils/getTripMatrix");

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
    )
      .populate("user")
      .populate({
        path: "orderItems",
        populate: {
          path: "restaurant",
          model: "StoreOwner",
        },
      })
      .populate({
        path: "orderItems",
        populate: {
          path: "category",
          model: "Category",
        },
      })
      .populate({
        path: "orderItems",
        populate: {
          path: "orders",
          model: "Order",
        },
      })
      .populate({
        path: "orderItems",
        populate: {
          path: "menus",
          model: "Menu",
        },
      })
      .populate({
        path: "orderItems",
        populate: {
          path: "feedbacks",
          model: "Feedback",
        },
      })
      .populate({
        path: "orderItems",
        populate: {
          path: "invoices",
          model: "Payment",
        },
      });

    if (status.toLowerCase() == "accepted") {
      const restaurantsLocations = doc?.orderItems?.reduce(
        (accumulator, restaurant) => {
          const { location } = restaurant?.restaurant;
          const mapLongLat = {
            longitude: location?.coordinates[0],
            latitude: location?.coordinates[1],
          };

          if (
            !accumulator.some(
              (restaurant) =>
                restaurant?.longitude === mapLongLat?.longitude &&
                restaurant?.latitude === mapLongLat?.latitude
            )
          ) {
            accumulator?.push(mapLongLat);
          }
          return accumulator;
        },
        []
      );

      const deliveryAddress = {
        longitude: doc?.deliveryAddress?.coordinates[0],
        latitude: doc?.deliveryAddress?.coordinates[1],
      };
      const { data: distanceDoc } = await getTripMatrix(restaurantsLocations, [
        deliveryAddress,
      ]);

      const orderNotification = {
        message: "New order available for you",
        user: doc?.user?._id,
        order: doc?._id,
        to: doc?.deliveryAddress,
        from: doc?.from,
        distance: distanceDoc?.rows[0]?.elements[0],
      };

      //   create a notification
      const notificationDoc = await Notification.create(orderNotification);

      //  push notifications to drivers near the user location
      await Driver.updateMany(
        {
          location: {
            $near: {
              $geometry: doc.deliveryAddress,
              //(8046.72 metres = 5miles) - the below is just approximated values to get rid of floats
              $maxDistance: 8050,
            },
          },
        },
        { $push: { notifications: notificationDoc._id } }
      );
    }

    return doc;
  } catch (error) {
    console.log(`[ERROR]: Failed to update  order | ${error.message}`);
    throw new ApolloError("Failed to update  order status");
  }
};
module.exports = orderControl;
