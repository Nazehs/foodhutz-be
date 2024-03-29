const { ApolloError, AuthenticationError } = require("apollo-server-express");

const { Order } = require("../../models");

const updateOrderStatus = async (_, { orderId, input }, { user }) => {
  try {
    if (!user) {
      throw new AuthenticationError("Unauthorised to perform this operation");
    }
    console.log(doc);
    return await Order.findById(
      orderId,
      {
        $set: { status: input.status },
      },
      { new: true }
    );
    // check the appropriate status then fire the next thing such as looking for driver
  } catch (error) {
    console.log(`[ERROR]: Failed to update order details| ${error.message}`);
    throw new ApolloError("Failed to update order details");
  }
};

module.exports = updateOrderStatus;
