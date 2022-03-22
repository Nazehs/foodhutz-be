const { model, Schema } = require("mongoose");

const notificationSchema = {
  code: {
    type: String,
  },
  value: {
    type: Number,
  },
  owner: {
    ref: "Restaurant",
    type: Schema.Types.ObjectID,
  },
};

const schema = new Schema(notificationSchema, {
  toJSON: {
    getters: true,
  },
  id: true,
});

const ReferralCode = model("ReferralCode", schema);

module.exports = ReferralCode;
