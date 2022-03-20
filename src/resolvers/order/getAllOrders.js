const { ApolloError, AuthenticationError } = require("apollo-server-express");

const { Order } = require("../../models");

const getAllOrder = async (_, { orderId }, { user }) => {
  try {
    if (!user) {
      throw new AuthenticationError("Unauthorised to perform this operation");
    }

    return {
      status: 0,
      success: true,
      orders: await Order.find(orderId)
        .populate("restaurant")
        .populate("category")
        .populate("customer"),
    };
  } catch (error) {
    console.log(`[ERROR]: Failed to get order details| ${error.message}`);
    throw new ApolloError("Failed to get order details");
  }
};

module.exports = getAllOrder;
