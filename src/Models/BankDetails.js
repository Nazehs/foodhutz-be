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
    required: true,
  },
  isDefault: {
    type: Boolean,
    required: true,
  },
};

const schema = new Schema(bankSchema, {
  toJSON: {
    getters: true,
  },
  id: true,
});

const bankDetails = model("BankDetail", schema);
module.exports = bankDetails;
