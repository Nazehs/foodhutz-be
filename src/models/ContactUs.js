const { model, Schema } = require("mongoose");

const complaintsSchema = {
  content: {
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
});

const Complaints = model("ContactUs", schema);

module.exports = Complaints;
