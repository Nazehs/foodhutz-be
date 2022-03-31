const { model, Schema } = require("mongoose");

const offersSchema = {
  name: {
    type: String,
    required: true,
    maxLength: 50,
  },
  category: {
    type: Schema.Types.ObjectID,
    ref: "Category",
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
    type: Number,
    required: true,
  },
  useBy: [
    {
      type: Schema.Types.ObjectID,
      ref: "Order",
    },
  ],
};

const schema = new Schema(offersSchema, {
  toJSON: {
    getters: true,
  },
  id: true,
  timestamps: true,
});

const Offers = model("Offers", schema);

module.exports = Offers;
