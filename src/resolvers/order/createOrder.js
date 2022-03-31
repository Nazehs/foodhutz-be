const { ApolloError } = require("apollo-server-express");
const { Order, Restaurant } = require("../../models");

const createOrder = async (_, { input }, { user }) => {
  try {
    if (!user) {
      throw new AuthenticationError("Unauthorised to perform this operation");
    }
    const doc = await Order.create(input);

    await Restaurant.findByIdAndUpdate(input.restaurant, {
      $push: { orders: doc._id },
    });

    return await Order.findById(doc._id)
      .populate("deliveryBy")
      .populate("customer")
      .populate("category")
      .populate("restaurant");
  } catch (error) {
    console.log(`[ERROR]: Failed to create order | ${error.message}`);
    throw new ApolloError("Failed to create order");
  }
};
module.exports = createOrder;
