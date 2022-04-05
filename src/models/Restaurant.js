const { model, Schema } = require("mongoose");

const restaurantSchema = {
  name: {
    type: String,
    required: true,
    maxLength: 200,
  },
  address: {
    type: String,
    required: true,
    maxLength: 200,
  },
  email: {
    type: String,
    maxLength: 50,
  },
  city: {
    type: String,
    required: true,
    maxLength: 200,
  },
  phoneNumber: {
    type: String,
    maxLength: 13,
    minLength: 11,
  },
  status: { type: ["Online", "Offline"] },
  openingHours: [{ from: String, to: String, day: String }],
  categories: [{ type: Schema.Types.ObjectId, ref: "Category" }],
  coupon: [{ type: Schema.Types.ObjectId, ref: "Coupon" }],
  orders: [{ type: Schema.Types.ObjectId, ref: "Order" }],
  menus: [{ type: Schema.Types.ObjectId, ref: "Menu" }],
};

const schema = new Schema(restaurantSchema, {
  toJSON: {
    getters: true,
  },
  id: true,
  timestamps: true,
});

const Restaurant = model("Restaurant", schema);

module.exports = Restaurant;
