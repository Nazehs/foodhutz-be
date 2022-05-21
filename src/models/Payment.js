const { model, Schema } = require("mongoose");
const paymentSchema = {
  fees: {
    type: String,
  },
  paymentType: {
    type: String,
  },
  status: {
    type: String,
  },
  restaurant: {
    type: Schema.Types.ObjectId,
    ref: "StoreOwner",
  },
  driver: { type: Schema.Types.ObjectId, ref: "Driver" },
  amount: {
    type: Number,
    default: 0,
  },
  bankDetails: {
    type: Schema.Types.ObjectId,
    ref: "BankDetails",
  },
  email: {
    type: String,
  },
};

const schema = new Schema(paymentSchema, {
  toJSON: {
    getters: true,
  },
  id: true,
  timestamps: true,
});

const Payment = model("Payment", schema);

module.exports = Payment;
