const { model, Schema } = require("mongoose");
const documentSchema = {
  name: { type: String, length: 255 },
  imageUrl: { type: String },
  status: {
    type: String,
    default: "Incomplete",
    enum: ["Approved", "Rejected"],
  },
};

const schema = new Schema(documentSchema, {
  toJSON: {
    getters: true,
  },
  id: true,
  timestamps: true,
});

const Document = model("Document", schema);

module.exports = Document;
