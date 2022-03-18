// create resolvers
const login = require("./login");
const signup = require("./signup");
const createMenu = require("./createMenu");
const createRestaurant = require("./createRestaurant");
const createTrip = require("./createTrips");
const createCategory = require("./createCategory");
const createMeal = require("./createMeal");
const createOffer = require("./createOffer");

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
const getRestaurant = require("./getRestaurant");
const getOffer = require("./getOffer");
const getCategory = require("./getCategory");

// update resolvers
const updateUser = require("./updateUser");
const updateCategory = require("./updateCategory");
const updateMeal = require("./updateMeal");
const updateTrip = require("./updateTrip");
const updateOffer = require("./updateOffer");
const updateRestaurant = require("./updateRestaurant");

const resolvers = {
  Query: {
    getUser,
    getAllUsers,
    getMeal,
    getOffer,
    getTrip,
    getRestaurant,
    getCategory,
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
    createRestaurant,
    createTrip,
    // update resolvers
    updateUser,
    updateRestaurant,
    updateCategory,
    updateTrip,
    updateOffer,
    updateMeal,
  },
};

module.exports = resolvers;
