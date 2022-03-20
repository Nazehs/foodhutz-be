const { ApolloError, AuthenticationError } = require("apollo-server-express");

const { Order } = require("../../models");

const updateOrder = async (_, { orderId, input }, { user }) => {
  try {
    if (!user) {
      throw new AuthenticationError("Unauthorised to perform this operation");
    }

    return await Order.findByIdAndUpdate(orderId, input, { new: true })
      .populate("category")
      .populate("customer");
  } catch (error) {
    console.log(`[ERROR]: Failed to update order details| ${error.message}`);
    throw new ApolloError("Failed to update order details");
  }
};

module.exports = updateOrder;
