const { model, Schema } = require("mongoose");

const referAndEarnSchema = {
  code: {
    type: String,
  },
  phoneNumber: {
    type: String,
  },
  email: {
    type: String,
  },
  user: {
    type: Schema.Types.ObjectID,
    ref: "User",
  },
};

const schema = new Schema(referAndEarnSchema, {
  toJSON: {
    getters: true,
  },
  id: true,
  timestamps: true,
});

const ReferAndEarn = model("ReferAndEarn", schema);

module.exports = ReferAndEarn;
