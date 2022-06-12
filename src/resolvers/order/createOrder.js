const { ApolloError, AuthenticationError } = require("apollo-server-express");
const { Order, StoreOwner } = require("../../models");
const { generateRandomNumber } = require("../../utils/generateRandomNumbers");
const getGeoLocation = require("../../utils/googleGeoCoder");

const createOrder = async (_, { input }, { user }) => {
  try {
    if (!user) {
      throw new AuthenticationError("Unauthorised to perform this operation");
    }

    input.user = user.id;
    input.requestOrderId = generateRandomNumber();

    // get the delivery address lat and long
    const {
      data: { results: deliveryAddress },
    } = await getGeoLocation(input.deliveryPostCode);

    // set the delivery address of the user
    const deliveryLocation = {
      type: "Point",
      coordinates: [
        deliveryAddress[0]?.geometry?.location?.lng,
        deliveryAddress[0].geometry?.location?.lat,
      ],
      formattedAddress: deliveryAddress[0]?.formatted_address,
      city: deliveryAddress[0]?.address_components[2]?.long_name,
      postCode: input?.deliveryPostCode,
    };

    input.deliveryAddress = deliveryLocation;

    // cascade the order id to the order items
    input.orderItems = input?.orderItems?.map((item) => {
      item.requestOrderId = input?.requestOrderId;
      item.customerId = user.id;
      return item;
    });
    // create the order
    const doc = await Order.create(input);
    let allDocs;
    let restaurantsLocation;
    if (input?.isMultipleRestaurant) {
      // reduces the order items to avoid duplicate calling the same restaurant for 2 updates
      const uniqueOrderItems = doc?.orderItems?.reduce((prev, orderItem) => {
        if (!prev[orderItem?.restaurant]) {
          prev[orderItem.restaurant] = [];
          prev[orderItem.restaurant] = [
            ...prev[orderItem.restaurant],
            orderItem,
          ];
        } else {
          prev[orderItem.restaurant] = [
            ...prev[orderItem.restaurant],
            orderItem,
          ];
        }
        return prev;
      }, {});

      // generate the promises for the restaurants
      const allOrders = Object.entries(uniqueOrderItems).map(
        ([restaurantId, orderItems]) =>
          StoreOwner.findByIdAndUpdate(restaurantId, {
            $push: { orders: { $each: orderItems } },
          })
      );

      // populate the restaurants orders accordingly in the db
      allDocs = await Promise.all(allOrders);

      restaurantsLocation = allDocs.map((order) => {
        const { location } = order;
        return location;
      });
    } else {
      // update the restaurant order items
      allDocs = await StoreOwner.findByIdAndUpdate(
        doc?.orderItems[0]?.restaurant,
        {
          $push: { orders: { $each: doc.orderItems } },
        }
      );
      // get the restaurant location for the frontend
      restaurantsLocation = [allDocs.location];
    }

    const docs = await Order.findById(doc._id)
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
          path: "customer",
          model: "User",
        },
      });
    docs.restaurantLocation = restaurantsLocation;

    return docs;
  } catch (error) {
    console.log(`[ERROR]: Failed to create order | ${error.message}`);
    throw new ApolloError("Failed to create order");
  }
};
module.exports = createOrder;
