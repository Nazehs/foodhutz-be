const { model, Schema } = require("mongoose");

const menuSchema = {
  name: {
    type: String,
    required: true,
    maxLength: 225,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
  },
  description: {
    type: String,
    required: true,
    maxLength: 250,
  },
  ingredients: {
    type: [{ type: String }],
    required: true,
    maxLength: 50,
  },
  recipes: [{ type: String }],
  price: {
    type: Number,
    required: true,
  },
  images: [{ type: String }],
  isActive: {
    type: Boolean,
    default: false,
  },
};

const schema = new Schema(menuSchema, {
  toJSON: {
    getters: true,
  },
  id: true,
});

const Menu = model("Menu", schema);

module.exports = Menu;
