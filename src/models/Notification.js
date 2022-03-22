const { model, Schema } = require("mongoose");

const notificationSchema = {
  content: {
    type: String,
  },
  user: {
    type: Schema.Types.ObjectID,
    ref: "User",
  },
};

const schema = new Schema(notificationSchema, {
  toJSON: {
    getters: true,
  },
  id: true,
});

const Notification = model("Notification", schema);

module.exports = Notification;
