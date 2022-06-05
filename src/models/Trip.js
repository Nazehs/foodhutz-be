const { model, Schema } = require("mongoose");

const CouponsSchema = {
  from: {
    type: String,
    required: true,
  },
  to: {
    type: String,
    required: true,
  },
  startTime: {
    type: Date,
    // required: true,
  },
  amount: {
    type: Number,
    default: 0,
  },
  arrivalTime: {
    type: Date,
    // required: true,
  },
  order: {
    type: Schema.Types.ObjectId,
    ref: "Order",
    required: true,
  },
  distance: {
    type: String,
  },
  duration: {
    type: String,
  },
  tip: {
    type: Number,
    default: 0,
  },
  status: {
    type: String,
  },
  rating: {
    type: Number,
    default: 0,
  },
};

const schema = new Schema(CouponsSchema, {
  toJSON: {
    getters: true,
  },
  id: true,
  timestamps: true,
});

const Trip = model("Trip", schema);

module.exports = Trip;
