const { model, Schema } = require("mongoose");
const bcrypt = require("bcrypt");
const Offers = require("./Offers");
const Order = require("./Order");

const userSchema = {
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
  offers: [{ type: Schema.Types.ObjectId, ref: "Offers" }],
  orders: [{ type: Schema.Types.ObjectId, ref: "Order" }],
  menus: [{ type: Schema.Types.ObjectId, ref: "Menu" }],
};

const schema = new Schema(userSchema, {
  toJSON: {
    getters: true,
  },
  id: true,
});

schema.methods.checkPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const Restaurant = model("Restaurant", schema);

module.exports = Restaurant;
