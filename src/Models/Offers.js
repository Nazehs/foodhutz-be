const { model, Schema } = require("mongoose");
const bcrypt = require("bcrypt");

const offersSchema = {
  name: {
    type: String,
    required: true,
    maxLength: 50,
  },
  date_active_from: {
    type: Date,
    required: true,
  },
  time_active_from: {
    type: Date,
    required: true,
  },
  time_active_to: {
    type: Date,
    required: true,
  },
  date_active_to: {
    type: Date,
    required: true,
  },
  offer_price: {
    type: Schema.Types.Decimal128,
    required: true,
  },
};

const schema = new Schema(offersSchema, {
  toJSON: {
    getters: true,
  },
  id: true,
});

const Offers = model("Offers", schema);

module.exports = Offers;
