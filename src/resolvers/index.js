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
const login = require("./user/login");
const signup = require("./user/signup");
const createMenu = require("./menu/createMenu");
const createRestaurant = require("./restaurant/createRestaurant");
const createTrip = require("./trip/createTrips");
const createCategory = require("./category/createCategory");
const createMeal = require("./meal/createMeal");
const createOffer = require("./offer/createOffer");
const createOrder = require("./order/createOrder");

// delete resolvers
const deleteUser = require("./user/deleteUser");
const deleteOffer = require("./offer/deleteOffer");
const deleteCategory = require("./category/deleteCategory");
const deleteMeal = require("./meal/deleteMeal");
const deleteRestaurant = require("./restaurant/deleteRestaurant");
const deleteTrip = require("./trip/deleteTrip");

// query resolvers
const getMeal = require("./meal/getMeal");
const getUser = require("./user/getUser");
const getAllUsers = require("./user/getAllUsers");
const getTrip = require("./trip/getTrip");
const getOrder = require("./order/getOrder");
const getRestaurant = require("./restaurant/getRestaurant");
const getOffer = require("./offer/getOffer");
const getCategory = require("./category/getCategory");
const getAllMenus = require("./menu/getAllMenus");
const getAllRestaurants = require("./restaurant/getAllRestaurants");
const getAllTrips = require("./trip/getAllTrips");
const getAllOrders = require("./order/getAllOrders");
// update resolvers
const updateUser = require("./user/updateUser");
const updateCategory = require("./category/updateCategory");
const updateMeal = require("./meal/updateMeal");
const updateTrip = require("./trip/updateTrip");
const updateOffer = require("./offer/updateOffer");
const updateOrder = require("./order/updateOrder");
const updateRestaurant = require("./restaurant/updateRestaurant");

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
