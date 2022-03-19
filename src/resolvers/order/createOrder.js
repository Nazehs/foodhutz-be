const { ApolloError } = require("apollo-server-express");
const { Order } = require("../../models");

const createOrder = async (_, { input }, { user }) => {
  try {
    if (!user) {
      throw new AuthenticationError("Unauthorised to perform this operation");
    }
    return await Order.create(input);
  } catch (error) {
    console.log(`[ERROR]: Failed to create order | ${error.message}`);
    throw new ApolloError("Failed to create order");
  }
};
module.exports = createOrder;
