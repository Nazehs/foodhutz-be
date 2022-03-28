const { model, Schema } = require("mongoose");

const orderSchema = {
  name: {
    type: String,
    required: true,
    maxLength: 50,
  },
  restaurant: {
    type: Schema.Types.ObjectId,
    ref: "Restaurant",
  },
  orderTime: {
    type: Date,
  },
  deliveryAddress: {
    type: String,
  },
  discount: {
    type: Number,
  },
  actualDeliveryTime: {
    type: Date,
  },
  finalPrice: {
    type: Number,
  },
  comment: {
    type: String,
  },
  customer: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  estimatedDeliveryTime: {
    type: Date,
  },
  actualDeliveryTime: {
    type: Date,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
  },
  orderStatus: {
    type: [
      "Completed Order",
      "Ongoing Order",
      "Upcoming Order",
      "Out for Delivery",
      "Picked",
      "Pickup",
    ],
  },
};

const schema = new Schema(orderSchema, {
  toJSON: {
    getters: true,
  },
  id: true,
  timestamps: true,
});

const Order = model("Order", schema);

module.exports = Order;
