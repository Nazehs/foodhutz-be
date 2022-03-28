const { ApolloError } = require("apollo-server-express");
const { Notification } = require("../../models");

const createNotification = async (_, { input }) => {
  try {
    const doc = await Notification.create(input);

    return await Notification.findById(doc._id)
      .populate("user")
      .populate("order")
      .populate({
        path: "order",
        populate: {
          path: "restaurant",
          model: "Restaurant",
        },
      })
      .populate({
        path: "order",
        populate: {
          path: "category",
          model: "Category",
        },
      });
  } catch (error) {
    console.log(`[ERROR]: Failed to create a Notification | ${error.message}`);
    throw new ApolloError("Failed to create a Notification");
  }
};

module.exports = createNotification;
