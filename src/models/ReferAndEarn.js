const { model, Schema } = require("mongoose");

const referAndEarnSchema = {
  code: {
    type: String,
  },
  userReferred: {
    type: Schema.Types.ObjectID,
    ref: "User",
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
});

const ReferAndEarn = model("ReferAndEarn", schema);

module.exports = ReferAndEarn;
