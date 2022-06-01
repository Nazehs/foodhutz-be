const { ApolloError, AuthenticationError } = require("apollo-server-express");
const {
  calculateFareToRestaurant,
  calculateFareToUser,
} = require("../../helpers/calculateTripFare");
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
    // console.log(doc);
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
      // get the trip matrix of the restaurants and the delivery address
      const { data: distanceDoc } = await getTripMatrix(restaurantsLocations, [
        deliveryAddress,
      ]);

      const orderNotification = {
        message: "New order available for you",
        user: doc?.user?._id,
        order: doc?._id,
        to: doc?.deliveryAddress,
        from: restaurantsLocations,
        distance: distanceDoc?.rows[0]?.elements[0],
      };
      // console.log(orderNotification);
      //  get drivers close the longitude and latitude of the order
      const nearByDrivers = await Driver.find({
        location: {
          $near: {
            $geometry: orderNotification.to,
          },
        },
      });

      // get the trip matrix of the restaurants and the delivery address
      const { data: nearByDriversLocation } = await getTripMatrix(
        restaurantsLocations,
        [
          {
            longitude: nearByDrivers[0]?.lastKnownLocation?.coordinates[0],
            latitude: nearByDrivers[0]?.lastKnownLocation?.coordinates[1],
          },
        ]
      );
      // calculate the fare of the driver and the restaurant
      const driverToRestaurantTripFare = calculateFareToRestaurant(
        nearByDriversLocation.rows[0].elements[0].distance.value
      );

      //  calculate the trip fare of the driver to the user location
      const driverToUserTripFare = calculateFareToUser(
        distanceDoc.rows[0].elements[0].distance.value
      );
      // set the suggested price of the trip
      orderNotification.amount =
        driverToRestaurantTripFare + driverToUserTripFare;

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
    throw new ApolloError(`Failed to update  order status || ${error.message}`);
  }
};
module.exports = orderControl;
