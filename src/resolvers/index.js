const { GraphQLScalarType, Kind } = require("graphql");

const dateScalar = new GraphQLScalarType({
  name: "Date",
  description: "Date custom scalar type",
  serialize(value) {
    return value.getTime(); // Convert outgoing Date to integer for JSON
  },
  parseValue(value) {
    return new Date(value); // Convert incoming integer to Date
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.INT) {
      return new Date(parseInt(ast.value, 10)); // Convert hard-coded AST string to integer and then to Date
    }
    return null; // Invalid hard-coded value (not an integer)
  },
});
// create resolvers
const login = require("./login");
const signup = require("./signup");
const createMenu = require("./createMenu");
const createRestaurant = require("./createRestaurant");
const createTrip = require("./createTrips");
const createCategory = require("./createCategory");
const createMeal = require("./createMeal");
const createOffer = require("./createOffer");
const createOrder = require("./createOrder");

// delete resolvers
const deleteUser = require("./deleteUser");
const deleteOffer = require("./deleteOffer");
const deleteCategory = require("./deleteCategory");
const deleteMeal = require("./deleteMeal");
const deleteRestaurant = require("./deleteRestaurant");
const deleteTrip = require("./deleteTrip");

// query resolvers
const getMeal = require("./getMeal");
const getUser = require("./getUser");
const getAllUsers = require("./getAllUsers");
const getTrip = require("./getTrip");
const getOrder = require("./getOrder");
const getRestaurant = require("./getRestaurant");
const getOffer = require("./getOffer");
const getCategory = require("./getCategory");
const getAllMenus = require("./getAllMenus");
const getAllRestaurants = require("./getAllRestaurants");
const getAllTrips = require("./getAllTrips");
const getAllOrders = require("./getAllOrders");
// update resolvers
const updateUser = require("./updateUser");
const updateCategory = require("./updateCategory");
const updateMeal = require("./updateMeal");
const updateTrip = require("./updateTrip");
const updateOffer = require("./updateOffer");
const updateOrder = require("./updateOrder");
const updateRestaurant = require("./updateRestaurant");

const resolvers = {
  Date: dateScalar,
  Query: {
    getUser,
    getAllUsers,
    getMeal,
    getOffer,
    getTrip,
    getRestaurant,
    getAllRestaurants,
    getCategory,
    getAllMenus,
    getAllTrips,
    getAllOrders,
    getOrder,
  },
  Mutation: {
    // delete resolvers
    deleteUser,
    deleteOffer,
    deleteCategory,
    deleteMeal,
    deleteRestaurant,
    deleteTrip,
    // create resolvers
    login,
    signup,
    createMenu,
    createCategory,
    createMeal,
    createOffer,
    createOrder,
    createRestaurant,
    createTrip,
    // update resolvers
    updateUser,
    updateRestaurant,
    updateCategory,
    updateOrder,
    updateTrip,
    updateOffer,
    updateMeal,
  },
};

module.exports = resolvers;
