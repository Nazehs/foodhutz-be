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
  arrivalTime: {
    type: Date,
    required: true,
  },
  order: {
    type: Schema.Types.ObjectId,
    ref: "Order",
    required: true,
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
