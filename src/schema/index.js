const { gql } = require("apollo-server-express");

const typeDefs = gql`
  scalar Date
  type User {
    id: ID!
    firstName: String!
    lastName: String!
    username: String!
    email: String!
    avatar: String
    phoneNumber: String!
    userType: String!
    orders: [Order]
    trips: [Trip]
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
    images: [String!]
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
    success: Boolean!
    offers: [Offer]
  }
  type AllReferralCode {
    status: Int!
    success: Boolean!
    referralCodes: [ReferralCodeResponse]
  }
  type AllComplaints {
    status: Int!
    success: Boolean!
    complaints: [ComplaintsResponse]
  }
  type AllContactUs {
    status: Int!
    success: Boolean!
    messages: [ContactUsResponse]
  }
  type AllReferAndEarn {
    status: Int!
    success: Boolean!
    ReferAndEarnCodes: [ReferAndEarnResponse]
  }
  type AllNotifications {
    status: Int!
    success: Boolean!
    notifications: [NotificationResponse]
  }
  type OTPVerification {
    status: Int!
    isValid: Boolean!
    message: String!
  }
  type ReferralCodeResponse {
    id: ID!
    code: String!
    value: Float!
    owner: Restaurant!
  }
  type ReferAndEarnResponse {
    id: ID!
    code: String!
    phoneNumber: String
    email: String
    user: User!
  }
  type ContactUsResponse {
    id: ID!
    queryType: String!
    user: User!
    message: String!
  }
  type ComplaintsResponse {
    id: ID!
    complaintType: String!
    user: User
    message: String!
    order: Order!
  }
  type NotificationResponse {
    id: ID!
    user: User!
    message: String!
    order: Order!
  }
  input NotificationInput {
    user: ID!
    message: String!
    order: ID!
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
    email: String
    password: String!
    phoneNumber: String
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
    images: [String]
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
    images: [String]
    recipes: [String]
  }
  input BankDetailInput {
    bankName: String
    fullName: String
    accountNumber: String
    sortCode: String
    isDefault: Boolean
  }
  input OTPVerificationInput {
    code: String!
    email: String!
    phoneNumber: String!
  }
  input ReferralCodeInput {
    code: String!
    value: Float!
    owner: ID!
  }
  input ReferAndEarnInput {
    code: String!
    phoneNumber: String
    email: String
    user: ID!
  }
  input ContactUsInput {
    queryType: String!
    user: ID!
    message: String!
  }
  input ComplaintsInput {
    complaintType: String!
    user: ID!
    message: String!
    order: ID!
  }
  input NotificationInput {
    user: ID!
    message: String!
    order: ID!
  }

  type Query {
    getUser(userId: ID!): User!
    getAllUsers: AllUsers
    getAllCategory: AllCategory
    getAllMenus: AllMenus!
    getAllTrips: AllTrips!
    getAllOffers: AllMenus!
    getAllOrders: AllOrders
    getAllComplaint: AllComplaints
    getAllReferAndEarn: AllReferAndEarn
    getAllReferralCode: AllReferralCode
    getAllNotification: AllNotifications
    getAllContactUs: AllContactUs
    getBankDetails(userId: ID): BankDetail
    getAllRestaurants: AllRestaurants!
    getCategory(categoryId: ID!): Category
    getOffer(offerId: ID!): Offer
    getTrip(tripId: ID!): Trip
    getOrder(orderId: ID!): Order
    getRestaurant(restaurantId: ID!): Restaurant
    getReferAndEarn(referralId: ID!): ReferAndEarnResponse
    getReferralCode(codeId: ID!): ReferralCodeResponse
    getComplaint(complaintId: ID!): ComplaintsResponse
    getNotification(notificationId: ID!): NotificationResponse
    getContactUs(messageId: ID!): ContactUsResponse
  }
  type Mutation {
    # update
    updateUser(input: UpdateUserInput!): Auth!
    updateMenu(menuId: ID!, input: MenuInputUpdate!): Menu!
    updateRestaurant(restaurantId: ID!, input: RestaurantInput!): Restaurant!
    updateCategory(categoryId: ID!, input: CategoryInput!): Category!
    updateTrip(tripId: ID!, input: TripUpdateInput!): Trip!
    updateOffer(offerId: ID!, input: OfferInputUpdate!): Offer!
    updateOrder(orderId: ID!, input: OrderInput!): Order!
    updateBankDetails(bankId: ID!, input: BankDetailInput!): BankDetail
    updateComplaint(
      complaintId: ID!
      input: ComplaintsInput!
    ): ComplaintsResponse
    updateContactUs(messageId: ID!, input: ContactUsInput!): ContactUsResponse
    updateNotification(
      notificationId: ID!
      input: NotificationInput!
    ): NotificationResponse
    updateReferAndEarn(
      referralId: ID!
      input: ReferAndEarnInput!
    ): ReferAndEarnResponse
    updateReferralCode(
      codeId: ID!
      input: ReferralCodeInput!
    ): ReferralCodeResponse
    verifyOTP(input: OTPVerificationInput): OTPVerification

    # delete
    deleteUser(userId: ID): Auth!
    deleteOffer(offerId: ID): Offer!
    deleteCategory(categoryId: ID): Category!
    deleteRestaurant(restaurantId: ID): Restaurant!
    deleteTrip(tripId: ID): Trip!
    deleteBankDetails(bankId: ID!): BankDetail
    deleteMenu(menuId: ID!): Menu
    deleteContactUs(messageId: ID!): ContactUsResponse
    deleteComplaint(complaintId: ID!): ComplaintsResponse
    deleteNotification(notificationId: ID!): NotificationResponse
    deleteReferAndEarn(referralId: ID!): ReferAndEarnResponse
    deleteReferralCode(codeId: ID): ReferralCodeResponse

    # create
    login(input: LoginInput!): Auth!
    signup(input: SignupInput!): Auth!
    createMenu(input: MenuInput): Menu!
    createCategory(input: CategoryInput): Category!
    createOffer(input: OfferInput): Offer!
    createRestaurant(input: RestaurantInput): Restaurant!
    createTrip(input: TripInput): Trip!
    createOrder(input: OrderInput): Order
    createBankDetails(input: BankDetailInput): BankDetail
    createNotification(input: NotificationInput): NotificationResponse
    createComplaint(input: ComplaintsInput): ComplaintsResponse
    createReferAndEarn(input: ReferAndEarnInput): ReferAndEarnResponse
    createContactUs(input: ContactUsInput): ContactUsResponse
    createReferralCode(input: ReferralCodeInput): ReferralCodeResponse
  }
`;

module.exports = typeDefs;
