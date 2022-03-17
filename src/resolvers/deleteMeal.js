const { ApolloError, AuthenticationError } = require("apollo-server-express");

const { Meal } = require("../models");

const deleteMeal = async (_, { mealId }, context) => {
  try {
    if (!context.user) {
      throw new AuthenticationError("Unauthorised to perform this operation");
    }

    return await Meal.findByIdAndDelete(mealId);
  } catch (error) {
    console.log(`[ERROR]: Failed to delete meal | ${error.message}`);
    throw new ApolloError("Failed to delete meal");
  }
};

module.exports = deleteMeal;
