const { gql } = require("apollo-server-express");

const typeDefs = gql`
  scalar Date
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
    name: String!
    email: String!
    city: String!
    address: String!
    phoneNumber: String!
    categories: [Category]
    orders: [Order]
    offers: [Offer]
    menus: [Menu]
  }

  type Order {
    id: ID!
    name: String!
    restaurant: Restaurant
    discount: Float
    deliveryAddress: String!
    actualDeliveryTime: Date!
    category: Category!
    comment: String!
    customer: User!
    estimatedDeliveryTime: Date
    finalPrice: Float!
    orderTime: Date!
  }
  type Offer {
    id: ID!
    name: String!
    timeActiveTo: Date!
    dateActiveFrom: Date!
    timeActiveFrom: Date!
    dateActiveTo: Date!
    offerPrice: Float!
  }

  type Trip {
    id: ID!
    from: String!
    to: String!
    arrivalTime: Date!
    startTime: Date!
    order: Order
  }
  type Menu {
    id: ID!
    isActive: Boolean!
    name: String!
    category: Category!
    ingredients: [String!]
    description: String!
    price: Float!
    recipes: [String]!
  }
  type BankDetail {
    id: ID!
    bankName: String!
    fullName: String!
    accountNumber: String!
    sortCode: String!
    isDefault: Boolean!
  }
  type Category {
    id: ID!
    name: String!
  }
  type Meal {
    id: ID!
  }
  type AllOrders {
    status: Int!
    success: Boolean!
    orders: [Order]
  }

  type AllMenus {
    status: Int!
    success: String
    menus: [Menu]
  }
  type AllRestaurants {
    status: Int!
    success: Boolean!
    restaurants: [Restaurant]
  }
  type AllCategory {
    status: Int!
    success: Boolean!
    categories: [Category]
  }
  type AllTrips {
    status: Int!
    success: Boolean!
    trips: [Trip]
  }
  type AllOffers {
    status: Int!
    success: String
    offers: [Offer]
  }
  input CategoryInput {
    name: String!
  }
  input MealInput {
    id: ID!
  }
  input RestaurantInput {
    name: String
    email: String
    city: String
    address: String
    phoneNumber: String
    categories: [ID]
    orders: [ID]
    offers: [ID]
    menus: [ID]
  }
  input OfferInput {
    name: String!
    timeActiveTo: Date!
    dateActiveFrom: Date!
    timeActiveFrom: Date!
    dateActiveTo: Date!
    offerPrice: Float!
  }
  input OfferInputUpdate {
    name: String
    timeActiveTo: Date
    dateActiveFrom: Date
    timeActiveFrom: Date
    dateActiveTo: Date
    offerPrice: Float
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

  input TripInput {
    from: String!
    to: String!
    arrivalTime: Date!
    startTime: Date!
    order: ID!
  }
  input TripUpdateInput {
    from: String
    to: String
    arrivalTime: Date
    startTime: Date
    order: ID
  }
  input MenuInput {
    isActive: Boolean!
    name: String!
    category: String!
    ingredients: [String!]
    description: String!
    price: Float!
    recipes: [String]!
  }
  input OrderInput {
    name: String
    restaurant: ID
    discount: Float
    deliveryAddress: String
    actualDeliveryTime: Date
    category: ID
    comment: String
    customer: ID
    estimatedDeliveryTime: Date
    finalPrice: Float
    orderTime: Date
  }
  input MenuInputUpdate {
    isActive: Boolean
    name: String
    category: String
    ingredients: String
    description: String
    price: Float
    recipes: [String]
  }
  input BankDetailInput {
    bankName: String
    fullName: String
    accountNumber: String
    sortCode: String
    isDefault: Boolean
  }
  type Query {
    getUser(userId: ID!): User!
    getAllUsers: AllUsers
    getMeal(mealId: ID!): Meal
    getAllCategory: AllCategory
    getAllMenus: AllMenus!
    getAllTrips: AllTrips!
    getAllOffers: AllMenus!
    getAllOrders: AllOrders
    getBankDetails(userId: ID): BankDetail
    getAllRestaurants: AllRestaurants!
    getCategory(categoryId: ID!): Category
    getOffer(offerId: ID!): Offer
    getTrip(tripId: ID!): Trip
    getOrder(orderId: ID!): Order
    getRestaurant(restaurantId: ID!): Restaurant
  }
  type Mutation {
    # update
    updateUser(input: UpdateUserInput!): Auth!
    updateMenu(menuId: ID!, input: MenuInputUpdate!): Menu!
    updateRestaurant(restaurantId: ID!, input: RestaurantInput!): Restaurant!
    updateCategory(categoryId: ID!, input: CategoryInput!): Category!
    updateTrip(tripId: ID!, input: TripUpdateInput!): Trip!
    updateOffer(offerId: ID!, input: OfferInputUpdate!): Offer!
    updateMeal(mealId: ID!, input: LoginInput): Meal!
    updateOrder(orderId: ID!, input: OrderInput!): Order!
    updateBankDetails(bankId: ID!, input: BankDetailInput!): BankDetail

    # delete
    deleteUser(userId: ID): Auth!
    deleteOffer(offerId: ID): Offer!
    deleteCategory(categoryId: ID): Category!
    deleteMeal(mealId: ID): Meal!
    deleteRestaurant(restaurantId: ID): Restaurant!
    deleteTrip(tripId: ID): Trip!
    deleteBankDetails(bankId: ID!): BankDetail
    deleteMenu(menuId: ID!): Menu
    # create
    login(input: LoginInput!): Auth!
    signup(input: SignupInput!): Auth!
    createMenu(input: MenuInput): Menu!
    createCategory(input: CategoryInput): Category!
    createMeal(input: String): Meal!
    createOffer(input: OfferInput): Offer!
    createRestaurant(input: RestaurantInput): Restaurant!
    createTrip(input: TripInput): Trip!
    createOrder(input: OrderInput): Order
    createBankDetails(input: BankDetailInput): BankDetail
  }
`;

module.exports = typeDefs;
