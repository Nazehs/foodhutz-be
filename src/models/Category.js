const { model, Schema } = require("mongoose");

const categorySchema = {
  name: {
    type: String,
    required: true,
    maxLength: 50,
  },
};

const schema = new Schema(categorySchema, {
  toJSON: {
    getters: true,
  },
  id: true,
});

const Category = model("Category", schema);

module.exports = Category;
