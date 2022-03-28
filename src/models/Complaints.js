const { model, Schema } = require("mongoose");

const complaintsSchema = {
  message: {
    type: String,
  },
  user: {
    type: Schema.Types.ObjectID,
    ref: "User",
  },
  order: {
    type: Schema.Types.ObjectID,
    ref: "Order",
  },
  complaintType: {
    type: String,
  },
};

const schema = new Schema(complaintsSchema, {
  toJSON: {
    getters: true,
  },
  id: true,
  timestamps: true,
});

const Complaints = model("Complaint", schema);

module.exports = Complaints;
