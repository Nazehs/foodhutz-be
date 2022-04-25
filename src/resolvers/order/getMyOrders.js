const { ApolloError, AuthenticationError } = require("apollo-server-express");

const { Order } = require("../../models");

const getMyOrders = async (_, __, { user }) => {
  try {
    if (!user) {
      throw new AuthenticationError("Unauthorised to perform this operation");
    }

    return await Order.findById(user.id);
  } catch (error) {
    console.log(`[ERROR]: Failed to get Myorder details| ${error.message}`);
    throw new ApolloError("Failed to get order details");
  }
};

module.exports = getMyOrders;
