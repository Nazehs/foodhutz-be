const mongoose = require("mongoose");
const locationSchema = new mongoose.Schema({
  _id: false,
  type: {
    type: String,
    enum: ["Point"],
    required: true,
  },
  coordinates: {
    type: [Number],
    index: "2dsphere",
    required: true,
  },
  formattedAddress: { type: String },
  postCode: { type: String },
  city: { type: String },
});

module.exports = locationSchema;
