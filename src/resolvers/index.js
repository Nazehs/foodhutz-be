const login = require("./login");
const signup = require("./signup");
const getUser = require("./getUser");
const getAllUsers = require("./getAllUsers");
const createMenu = require("./menu");
const restaurant = require("./restaurant");
const trips = require("./trips");
const updateUser = require("./updateUser");
const deleteUser = require("./deleteUser");

const resolvers = {
  Query: {
    getUser,
    getAllUsers,
  },
  Mutation: {
    login,
    signup,
    createMenu,
    restaurant,
    deleteUser,
    trips,
    updateUser,
  },
};

module.exports = resolvers;
