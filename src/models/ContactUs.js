const { model, Schema } = require("mongoose");

const complaintsSchema = {
  message: {
    type: String,
  },
  user: {
    type: Schema.Types.ObjectID,
    ref: "User",
  },
  queryType: {
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

const Complaints = model("ContactUs", schema);

module.exports = Complaints;
