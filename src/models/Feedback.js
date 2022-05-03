// sort({ body: 1 })
const { model, Schema } = require("mongoose");

const feedbackSchema = {
  message: {
    type: String,
  },
  user: {
    type: Schema.Types.ObjectID,
    ref: "User",
  },
  order: {
    type: Schema.Types.ObjectID,
    ref: "Order",
  },
  restaurant: {
    type: Schema.Types.ObjectID,
    ref: "StoreOwner",
  },
  driver: {
    type: Schema.Types.ObjectID,
    ref: "Driver",
  },
  stars: {
    type: Number,
  },
};

const schema = new Schema(feedbackSchema, {
  toJSON: {
    getters: true,
  },
  id: true,
  timestamps: true,
});

const Feedback = model("Feedback", schema);

module.exports = Feedback;
