const { ApolloError, AuthenticationError } = require("apollo-server-express");

const { Meal } = require("../../models");

const getMeal = async (_, { mealId }, { user }) => {
  try {
    if (!user) {
      throw new AuthenticationError("Unauthorised to perform this operation");
    }

    return await Meal.findById(mealId);
  } catch (error) {
    console.log(`[ERROR]: Failed to get meal details | ${error.message}`);
    throw new ApolloError("Failed to get meal details");
  }
};

module.exports = getMeal;
