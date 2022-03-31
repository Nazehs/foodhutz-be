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
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  amount: {
    type: Number,
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
