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
