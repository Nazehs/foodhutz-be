const { model, Schema } = require("mongoose");
const OrderItem = require("./OrderItem");

const orderSchema = {
  orderTime: {
    type: Date,
    default: Date.now(),
  },
  deliveryAddress: {
    type: String,
  },
  discount: {
    type: Number,
    default: 0,
  },
  actualDeliveryTime: {
    type: Date,
  },
  user: {
    type: Schema.Types.ObjectID,
    ref: "User",
  },
  finalPrice: {
    type: Number,
  },
  comment: {
    type: String,
  },
  subtotal: { type: Number },
  orderItems: [OrderItem],

  estimatedDeliveryTime: {
    type: Date,
  },
  actualDeliveryTime: {
    type: Date,
  },
  rating: {
    type: Number,
    default: 0,
  },
  orderStatus: {
    type: String,
    enum: [
      "Completed Order",
      "Ongoing Order",
      "Upcoming Order",
      "Out for Delivery",
      "Picked",
      "Pickup",
      "New",
      "Accepted",
      "Rejected",
      "Cancelled",
    ],
    default: "New",
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
