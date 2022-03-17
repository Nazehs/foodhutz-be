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
    getMenus: User!
    getRestaurants: User!
    getSingleRestaurant(id: ID!): User!
  }
  type Mutation {
    login(input: LoginInput!): Auth!
    updateUser(input: UpdateUserInput!): Auth!
    deleteUser(userId: ID): Auth!
    createMenu(input: String): Auth!
    restaurant: Restaurant
    trips: String
    updateMenu(menuId: ID!, input: LoginInput): Auth!
    signup(input: SignupInput!): Auth!
  }
`;

module.exports = typeDefs;
