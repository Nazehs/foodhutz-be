const { ApolloError, AuthenticationError } = require("apollo-server-express");

const { User, StoreOwner } = require("../../models");

const getMyOrders = async (_, { limit = 10, skip = 0 }, { user }) => {
  try {
    if (!user) {
      throw new AuthenticationError("Unauthorised to perform this operation");
    }

    // return await Order.findById({ customer: user.id });
    let docs;
    console.log("user", user);
    if (user.userType === "USER") {
      docs = await User.findById(user.id).populate("orders").sort("desc");
    }
    if (user.userType === "RESTAURANT") {
      docs = await StoreOwner.findById(user.id).populate("orders").sort("desc");
    }
    console.log("docs", docs);
    const ordersCount = docs.orders.length;

    const totalPages = Math.ceil(ordersCount / limit);
    const currentPage = Math.ceil(ordersCount % (skip + 1));
    return {
      status: 0,
      success: true,
      currentPage: currentPage == 0 ? currentPage + 1 : currentPage,
      totalPages,
      hasMore: ordersCount >= limit + 1,
      orders: docs.orders,
    };
  } catch (error) {
    console.log(`[ERROR]: Failed to get Myorder details| ${error.message}`);
    throw new ApolloError("Failed to get order details");
  }
};

module.exports = getMyOrders;
