const { Schema, model } = require("mongoose");

const bankSchema = {
  bankName: {
    type: String,
    required: true,
    maxLength: 200,
  },
  fullName: {
    type: String,
    required: true,
  },
  accountNumber: {
    type: String,
    minLength: 8,
    required: true,
  },
  sortCode: {
    type: String,
    required: true,
    minLength: 6,
  },
  isDefault: {
    type: Boolean,
    default: false,
    required: true,
  },
};

const schema = new Schema(bankSchema, {
  toJSON: {
    getters: true,
  },
  id: true,
  timestamps: true,
});

const bankDetails = model("BankDetail", schema);
module.exports = bankDetails;
