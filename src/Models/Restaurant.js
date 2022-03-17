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
  categories: [{ type: Schema.Types.ObjectId, ref: "Category" }],
  offers: [{ type: Schema.Types.ObjectId, ref: "Offers" }],
  orders: [{ type: Schema.Types.ObjectId, ref: "Order" }],
  menus: [{ type: Schema.Types.ObjectId, ref: "Menu" }],
};

const schema = new Schema(restaurantSchema, {
  toJSON: {
    getters: true,
  },
  id: true,
});

const Restaurant = model("Restaurant", schema);

module.exports = Restaurant;
