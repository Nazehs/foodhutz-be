const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    id: ID!
    firstName: String!
    lastName: String!
    username: String!
    email: String!
    phoneNumber: String!
    userType: String!
  }
  type AllUsers {
    users: [User]
    message: String!
    status: Int!
    success: Boolean!
  }
  type Auth {
    token: ID!
    user: User!
  }
  type Restaurant {
    id: ID!
  }
  input LoginInput {
    email: String!
    password: String!
  }
  input SignupInput {
    firstName: String!
    lastName: String!
    username: String!
    phoneNumber: String
    userType: String
    email: String!
    password: String!
  }

  input UpdateUserInput {
    firstName: String
    lastName: String
    username: String
    phoneNumber: String
    userType: String
    email: String
    password: String
  }

  type Query {
    getUser(userId: ID!): User!
    getAllUsers: AllUsers
    getMeal(mealId: ID!): String
    getMenus: User!
    getRestaurants: User!
    getSingleRestaurant(id: ID!): User!
    getCategory(mealId: ID!): String
    getOffer(mealId: ID!): String
    getTrip(mealId: ID!): String
    getRestaurant(mealId: ID!): String
  }
  type Mutation {
    # update
    updateUser(input: UpdateUserInput!): Auth!
    updateMenu(menuId: ID!, input: LoginInput): Auth!
    updateRestaurant(menuId: ID!, input: LoginInput): Auth!
    updateCategory(menuId: ID!, input: LoginInput): Auth!
    updateTrip(menuId: ID!, input: LoginInput): Auth!
    updateOffer(menuId: ID!, input: LoginInput): Auth!
    updateMeal(menuId: ID!, input: LoginInput): Auth!
    # delete
    deleteUser(userId: ID): Auth!
    deleteOffer(userId: ID): Auth!
    deleteCategory(userId: ID): Auth!
    deleteMeal(userId: ID): Auth!
    deleteRestaurant(userId: ID): Auth!
    deleteTrip(userId: ID): Auth!
    # create
    login(input: LoginInput!): Auth!
    signup(input: SignupInput!): Auth!
    createMenu(input: String): Auth!
    createCategory(input: String): Auth!
    createMeal(input: String): Auth!
    createOffer(input: String): Auth!
    createRestaurant(input: String): Auth!
    createTrip(input: String): Auth!
  }
`;

module.exports = typeDefs;
