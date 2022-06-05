const { ApolloError } = require("apollo-server-express");
const { Order } = require("../models");

const updateOrderPaymentStatus = async (orderId, status) => {
  try {
    const doc = await Order.findByIdAndUpdate(orderId, {
      paymentStatus: status,
    });

    return doc;
  } catch (error) {
    console.log(`[ERROR]: Failed to update payment Status | ${error.message}`);
    throw new ApolloError("Failed to update payment Status ");
  }
};
module.exports = updateOrderPaymentStatus;
