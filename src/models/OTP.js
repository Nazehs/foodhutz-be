const { model, Schema } = require("mongoose");

const OtpSchema = {
  otp: {
    type: Number,
  },
  user: {
    type: Schema.Types.ObjectID,
    ref: "User",
  },
};

const schema = new Schema(OtpSchema, {
  toJSON: {
    getters: true,
  },
  id: true,
});

const Otp = model("Otp", schema);

module.exports = Otp;
