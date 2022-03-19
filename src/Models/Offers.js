const { model, Schema } = require("mongoose");

const offersSchema = {
  name: {
    type: String,
    required: true,
    maxLength: 50,
  },
  dateActiveFrom: {
    type: Date,
    required: true,
  },
  timeActiveFrom: {
    type: Date,
    required: true,
  },
  timeActiveTo: {
    type: Date,
    required: true,
  },
  dateActiveTo: {
    type: Date,
    required: true,
  },
  offerPrice: {
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

const Offers = model("Offers", schema);

module.exports = Offers;
