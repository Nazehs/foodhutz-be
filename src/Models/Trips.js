const { model, Schema } = require("mongoose");

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
    type: Schema.Types.Decimal,
    required: true,
  },
};

const schema = new Schema(offersSchema, {
  toJSON: {
    getters: true,
  },
  id: true,
});

const Trip = model("Trip", schema);

module.exports = Trip;
