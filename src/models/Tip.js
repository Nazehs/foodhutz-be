const { model, Schema } = require("mongoose");
const tipsSchema = {
  amount: {
    type: Number,
  },
  order: {
    type: Schema.Types.ObjectID,
    ref: "Order",
  },
};

const schema = new Schema(tipsSchema, {
  toJSON: {
    getters: true,
  },
  id: true,
  timestamps: true,
});

const Tip = model("Tip", schema);

module.exports = Tip;
