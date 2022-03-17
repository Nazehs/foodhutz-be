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
    type: Schema.Types.Decimal,
  },
  actualDeliveryTime: {
    type: Date,
  },
  finalPrice: {
    type: Schema.Types.Decimal,
  },
  comment: {
    type: String,
  },
  customer: {
    type: String,
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
};

const schema = new Schema(orderSchema, {
  toJSON: {
    getters: true,
  },
  id: true,
});

const Order = model("Order", schema);

module.exports = Order;
