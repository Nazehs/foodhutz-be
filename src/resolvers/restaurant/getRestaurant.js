const { ApolloError, AuthenticationError } = require("apollo-server-express");

const { StoreOwner } = require("../../models");

const getStoreOwner = async (_, { restaurantId }, { user }) => {
  try {
    if (!user) {
      throw new AuthenticationError("Unauthorised to perform this operation");
    }

    return await StoreOwner.findById(restaurantId)
      .populate("feedbacks")
      .populate("categories")
      .populate("orders")
      .populate("menus")
      .populate("invoices")
      .populate("coupons")
      .populate("bankDetails")
      .populate("documents")
      .populate({
        path: "orders",
        populate: {
          path: "orderItems",
          populate: {
            path: "category",
            model: "Category",
          },
        },
      })
      .populate({
        path: "menus",
        populate: {
          path: "category",
          model: "Category",
        },
      })
      .populate({
        path: "orders",
        populate: {
          path: "orderItems",
          populate: {
            path: "restaurant",
            model: "StoreOwner",
          },
        },
      })
      .populate({
        path: "invoices",
        populate: {
          path: "bankDetails",
          model: "BankDetail",
        },
      });
  } catch (error) {
    console.log(`[ERROR]: Failed to get StoreOwner details | ${error.message}`);
    throw new ApolloError(
      `Failed to get StoreOwner details  || ${error.message}`
    );
  }
};

module.exports = getStoreOwner;
