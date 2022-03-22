const { model, Schema } = require("mongoose");

const complaintsSchema = {
  content: {
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
});

const Complaints = model("Complaint", schema);

module.exports = Complaints;
