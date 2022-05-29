const { model, Schema } = require("mongoose");

const notificationSchema = {
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
  to: {
    type: String,
  },
  from: { type: String },
  distance: {
    duration: {
      text: { type: String },
      value: { type: Number },
    },
    distance: {
      text: { type: String },
      value: { type: Number },
    },
    duration_in_traffic: {
      text: { type: String },
      value: { type: Number },
    },
  },
};

const schema = new Schema(notificationSchema, {
  toJSON: {
    getters: true,
  },
  timestamps: true,
  id: true,
});

const Notification = model("Notification", schema);

module.exports = Notification;
