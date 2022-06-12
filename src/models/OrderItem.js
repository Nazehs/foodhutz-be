const { Schema } = require("mongoose");

const OrderItem = {
  name: {
    type: String,
    required: true,
    maxLength: 50,
  },
  restaurant: {
    type: Schema.Types.ObjectId,
    ref: "StoreOwner",
  },
  amount: {
    type: Number,
  },
  deliveryAddress: {
    type: String,
  },
  restaurantAddress: {
    type: String,
  },
  discount: {
    type: Number,
    default: 0,
  },
  foodPrepTime: { type: Number, default: 15 },
  customer: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
  },
};

module.exports = OrderItem;
