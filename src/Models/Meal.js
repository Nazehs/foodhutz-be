const { model, Schema } = require("mongoose");

const mealSchema = {
  name: {
    type: String,
    required: true,
    maxLength: 225,
  },
  category: {
    type: String,
    required: true,
    maxLength: 50,
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
  recipes: {
    type: [{ type: String }],
    required: true,
    maxLength: 50,
  },
  price: {
    type: Schema.Types.Decimal128,
    required: true,
    maxLength: 12,
  },
  status: {
    type: Boolean,
    default: false,
  },
};

const schema = new Schema(mealSchema, {
  toJSON: {
    getters: true,
  },
  id: true,
});

const Meal = model("Meal", schema);

module.exports = Meal;
