const { model, Schema } = require("mongoose");

const offersSchema = {
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
    required: true,
  },
  amount: {
    type: Number,
  },
  arrivalTime: {
    type: Date,
    required: true,
  },
  order: {
    type: Schema.Types.ObjectId,
    ref: "Order",
    required: true,
  },
  distance: {
    type: Number,
  },
  duration: {
    type: String,
  },
  tip: {
    type: Number,
  },
};

const schema = new Schema(offersSchema, {
  toJSON: {
    getters: true,
  },
  id: true,
  timestamps: true,
});

const Trip = model("Trip", schema);

module.exports = Trip;
