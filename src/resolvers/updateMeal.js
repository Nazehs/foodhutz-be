const { ApolloError, AuthenticationError } = require("apollo-server-express");

const { Meal } = require("../models");

const updateMeal = async (_, { mealId, input }, { user }) => {
  try {
    if (!user) {
      throw new AuthenticationError("Unauthorised to perform this operation");
    }

    return await Meal.findByIdAndUpdate(mealId, input);
  } catch (error) {
    console.log(`[ERROR]: Failed to update meal  | ${error.message}`);
    throw new ApolloError("Failed to update meal ");
  }
};

module.exports = updateMeal;
