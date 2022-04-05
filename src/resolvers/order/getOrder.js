const { ApolloError, AuthenticationError } = require("apollo-server-express");

const { Order } = require("../../models");

const getOrder = async (_, { orderId }, { user }) => {
  try {
    if (!user) {
      throw new AuthenticationError("Unauthorised to perform this operation");
    }
   

    return await Order.findById(orderId);
  } catch (error) {
    console.log(`[ERROR]: Failed to get order details| ${error.message}`);
    throw new ApolloError("Failed to get order details");
  }
};

module.exports = getOrder;
