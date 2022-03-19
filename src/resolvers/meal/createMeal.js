const { ApolloError, AuthenticationError } = require("apollo-server-express");

const { Meal } = require("../../models");

const createMeal = async (_, { input }, context) => {
  try {
    if (!context.user) {
      throw new AuthenticationError("Unauthorised to perform this operation");
    }
    return await Meal.create(input);
  } catch (error) {
    console.log(`[ERROR]: Failed to create meal | ${error.message}`);
    throw new ApolloError("Failed to create meal");
  }
};

module.exports = createMeal;
