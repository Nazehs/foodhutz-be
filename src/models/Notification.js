const { model, Schema } = require("mongoose");
const locationSchema = require("./LocationSchema");

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
    index: "2dsphere",
    type: locationSchema,
  },
  from: {
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
  amount: {
    type: Number,
    default: 0,
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
