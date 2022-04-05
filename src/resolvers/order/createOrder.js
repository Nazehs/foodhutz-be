const { ApolloError, AuthenticationError } = require("apollo-server-express");
const { Order, Restaurant, StoreOwner, User } = require("../../models");

const createOrder = async (_, { input }, { user }) => {
  try {
    if (!user) {
      throw new AuthenticationError("Unauthorised to perform this operation");
    }
    input.customer = user.id;
    const doc = await Order.create(input);
    console.log(doc._id);
    await StoreOwner.findByIdAndUpdate(doc.orderItems[0].restaurant, {
      $push: { orders: doc._id },
    });
    await User.findByIdAndUpdate(user.id, {
      $push: { orders: orderItems[0] },
    });

    return await Order.findById(doc._id)
      .populate({
        path: "orderItems",
        populate: {
          path: "restaurant",
          model: "StoreOwner",
        },
      })
      .populate({
        path: "orderItems",
        populate: {
          path: "category",
          model: "Category",
        },
      });
  } catch (error) {
    console.log(`[ERROR]: Failed to create order | ${error.message}`);
    throw new ApolloError("Failed to create order");
  }
};
module.exports = createOrder;
