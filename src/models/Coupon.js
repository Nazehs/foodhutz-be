const { model, Schema } = require("mongoose");

const couponSchema = {
  name: {
    type: String,
    required: true,
    maxLength: 50,
  },
  category: {
    type: Schema.Types.ObjectID,
    ref: "Category",
  },
  dateActiveFrom: {
    type: Date,
    required: true,
  },
  timeActiveFrom: {
    type: Date,
    required: true,
  },
  timeActiveTo: {
    type: Date,
    required: true,
  },
  dateActiveTo: {
    type: Date,
    required: true,
  },
  CouponPrice: {
    type: Number,
    required: true,
  },
  useBy: [
    {
      type: Schema.Types.ObjectID,
      ref: "Order",
    },
  ],
};

const schema = new Schema(couponSchema, {
  toJSON: {
    getters: true,
  },
  id: true,
  timestamps: true,
});

const Coupon = model("Coupon", schema);

module.exports = Coupon;
