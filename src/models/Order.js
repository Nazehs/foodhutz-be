const { model, Schema } = require("mongoose");
const locationSchema = require("./LocationSchema");
const OrderItem = require("./OrderItem");

const orderSchema = {
  orderTime: {
    type: Date,
    default: Date.now(),
  },
  discount: {
    type: Number,
    default: 0,
  },
  requestOrderId: { type: String },
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
  // city: { type: String },
  // comment: {
  //   type: String,
  // },
  // deliveryAddress: { type: String },
  deliveryAddress: {
    type: locationSchema,
    index: "2dsphere",
  },
  restaurantLocation: {
    type: [locationSchema],
    index: "2dsphere",
  },
  subtotal: { type: Number },
  orderItems: [OrderItem],
  isMultipleRestaurant: { type: Boolean, default: false },
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
  paymentStatus: {
    type: String,
    enum: [
      "Pending",
      "Processing",
      "Action Required",
      "Cancelled",
      "Refunded",
      "Failed",
      "Paid",
      "Unpaid",
      "NEW",
    ],
    default: "Pending",
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
// orderSchema.index({ deliveryAddress: 1 });
const schema = new Schema(orderSchema, {
  toJSON: {
    getters: true,
  },
  id: true,
  timestamps: true,
});

const Order = model("Order", schema);

module.exports = Order;
