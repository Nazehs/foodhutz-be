const { ApolloError, AuthenticationError } = require("apollo-server-express");

const { Order } = require("../../models");

const getAllOrder = async (_, { limit = 10, skip = 0 }, { user }) => {
  try {
    console.log("here");
    if (!user) {
      throw new AuthenticationError("Unauthorised to perform this operation");
    }
    if (limit == 0) {
      throw new ApolloError("Provide a valid limit");
    }
    const ordersCount = await Order.count();
    const docs = await Order.find({})
      .sort("desc")
      .populate("orderItems")
      .populate({
        path: "orderItems",
        populate: { path: "restaurant", model: "StoreOwner" },
      })
      .populate({
        path: "orderItems",
        populate: { path: "category", model: "Category" },
      })
      .populate({
        path: "orderItems",
        populate: { path: "customer", model: "User" },
      })
      .skip(skip)
      .limit(limit);

    const totalPages = Math.ceil(ordersCount / limit);
    const currentPage = Math.ceil(ordersCount % (skip + 1));
    return {
      status: 0,
      success: true,
      currentPage: currentPage == 0 ? currentPage + 1 : currentPage,
      totalPages,
      hasMore: ordersCount >= limit + 1,
      orders: docs,
    };
  } catch (error) {
    console.log(`[ERROR]: Failed to get order details| ${error.message}`);
    throw new ApolloError(`Failed to get order details | ${error.message}`);
  }
};

module.exports = getAllOrder;
