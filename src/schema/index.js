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
    dateOfJoin: Date
  }
  type Driver {
    id: ID!
    firstName: String!
    lastName: String!
    username: String!
    email: String!
    avatar: String
    phoneNumber: String!
    userType: String!
    trips: [Trip]
    dateOfJoin: Date
    vehicleType: String
    vehicleNumber: String
    documents: [Document]
    tips: [Tips]
  }
  type Document {
    name: String
    url: String
    status: String
  }
  type Tips {
    amount: Float
    order: Order!
  }
  type AllUsers {
    users: [User]
    message: String!
    status: Int!
    currentPage: Int!
    totalPages: Int!
    success: Boolean!
    hasMore: Boolean!
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
    openingHours: [Hours]
  }
  type Hours {
    from: String
    to: String
    day: String
  }
  type Order {
    id: ID!
    name: String!
    restaurant: Restaurant
    discount: Float
    deliveryAddress: String!
    actualDeliveryTime: Date!
    category: Category!
    comment: String
    customer: User!
    estimatedDeliveryTime: Date
    finalPrice: Float!
    orderTime: Date!
    deliveryBy: ID
    orderStatus: String!
    rating: Float
  }
  type Offer {
    id: ID!
    name: String!
    timeActiveTo: Date!
    dateActiveFrom: Date!
    timeActiveFrom: Date!
    dateActiveTo: Date!
    offerPrice: Float!
    useBy: [Order]
    category: Category
  }
  type Payment {
    amount: Float!
    user: User
    email: String
    paymentType: String
    fees: Float!
    status: String!
  }
  type Trip {
    id: ID!
    from: String!
    to: String!
    arrivalTime: Date!
    startTime: Date!
    order: Order
    amount: Float!
    duration: Float
    time: Float
    tip: Float
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
    currentPage: Int!
    totalPages: Int!
    hasMore: Boolean!
    orders: [Order]
  }

  type AllMenus {
    status: Int!
    success: String
    currentPage: Int!
    totalPages: Int!
    hasMore: Boolean!
    menus: [Menu]
  }
  type AllRestaurants {
    currentPage: Int!
    totalPages: Int!
    hasMore: Boolean!
    success: Boolean!
    restaurants: [Restaurant]
  }
  type AllCategory {
    currentPage: Int!
    totalPages: Int!
    hasMore: Boolean!
    success: Boolean!
    status: Int!
    categories: [Category]
  }
  type AllTrips {
    currentPage: Int!
    totalPages: Int!
    status: Int!
    success: Boolean!
    hasMore: Boolean!
    trips: [Trip]
  }
  type AllOffers {
    status: Int!
    currentPage: Int!
    totalPages: Int!
    success: Boolean!
    hasMore: Boolean!
    offers: [Offer]
  }
  type AllReferralCode {
    currentPage: Int!
    totalPages: Int!
    status: Int!
    hasMore: Boolean!
    success: Boolean!
    referralCodes: [ReferralCodeResponse]
  }
  type AllComplaints {
    status: Int!
    success: Boolean!
    currentPage: Int!
    totalPages: Int!
    hasMore: Boolean!
    complaints: [ComplaintsResponse]
  }
  type AllContactUs {
    status: Int!
    currentPage: Int!
    totalPages: Int!
    success: Boolean!
    hasMore: Boolean!
    messages: [ContactUsResponse]
  }
  type AllDrivers {
    status: Int!
    currentPage: Int!
    totalPages: Int!
    success: Boolean!
    hasMore: Boolean!
    drivers: [Driver]
  }
  type AllReferAndEarn {
    status: Int!
    currentPage: Int!
    totalPages: Int!
    success: Boolean!
    hasMore: Boolean!
    ReferAndEarnCodes: [ReferAndEarnResponse]
  }
  type AllNotifications {
    status: Int!
    currentPage: Int!
    totalPages: Int!
    success: Boolean!
    hasMore: Boolean!
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
  input NotificationInputUpdate {
    user: ID
    message: String
    order: ID
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
  input PaymentInput {
    amount: Float
    user: ID!
    email: String
    paymentType: String
    fees: Float!
    status: String!
  }
  input PaymentInputUpdate {
    amount: Float
    user: ID
    email: String
    paymentType: String
    fees: Float
    status: String
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
  input ReferralCodeInputUpdate {
    code: String
    value: Float
    owner: ID
  }
  input ReferAndEarnInput {
    code: String!
    phoneNumber: String
    email: String
    user: ID!
  }
  input ReferAndEarnInputUpdate {
    code: String
    phoneNumber: String
    email: String
    user: ID
  }
  input ContactUsInput {
    queryType: String!
    user: ID!
    message: String!
  }
  input ContactUsInputUpdate {
    queryType: String
    user: ID
    message: String
  }
  input ComplaintsInput {
    complaintType: String!
    user: ID!
    message: String!
    order: ID!
  }

  input ComplaintsInputUpdate {
    complaintType: String
    user: ID
    message: String
    order: ID
  }
  input NotificationInput {
    user: ID!
    message: String!
    order: ID!
  }

  type Query {
    getAllUsers(limit: Int, skip: Int): AllUsers
    getAllDrivers: AllDrivers
    getAllCategory(limit: Int, skip: Int): AllCategory
    getAllMenus(limit: Int, skip: Int): AllMenus!
    getAllTrips(limit: Int, skip: Int): AllTrips!
    getAllOffers(limit: Int, skip: Int): AllOffers!
    getAllOrders(limit: Int, skip: Int): AllOrders
    getAllComplaint(limit: Int, skip: Int): AllComplaints
    getAllReferAndEarn(limit: Int, skip: Int): AllReferAndEarn
    getAllReferralCode(limit: Int, skip: Int): AllReferralCode
    getAllNotification(limit: Int, skip: Int): AllNotifications
    getAllContactUs(limit: Int, skip: Int): AllContactUs
    getAllRestaurants(limit: Int, skip: Int): AllRestaurants!
    getUser(userId: ID!): User!
    getDriver(userId: ID!): Driver!
    getBankDetails(userId: ID): BankDetail
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
    # create
    login(input: LoginInput!): Auth!
    driverLogin(input: LoginInput!): Auth
    signup(input: SignupInput!): Auth!
    driverSignup(input: SignupInput!): Auth!
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

    # update
    updateUser(input: UpdateUserInput!): Auth!
    updateDriver(input: UpdateUserInput!): Auth!
    updateMenu(menuId: ID!, input: MenuInputUpdate!): Menu!
    updateRestaurant(restaurantId: ID!, input: RestaurantInput!): Restaurant!
    updateCategory(categoryId: ID!, input: CategoryInput!): Category!
    updateTrip(tripId: ID!, input: TripUpdateInput!): Trip!
    updateOffer(offerId: ID!, input: OfferInputUpdate!): Offer!
    updateOrder(orderId: ID!, input: OrderInput!): Order!
    updateBankDetails(bankId: ID!, input: BankDetailInput!): BankDetail
    updateComplaint(
      complaintId: ID!
      input: ComplaintsInputUpdate!
    ): ComplaintsResponse
    updateContactUs(
      messageId: ID!
      input: ContactUsInputUpdate!
    ): ContactUsResponse
    updateNotification(
      notificationId: ID!
      input: NotificationInputUpdate!
    ): NotificationResponse
    updateReferAndEarn(
      referralId: ID!
      input: ReferAndEarnInputUpdate!
    ): ReferAndEarnResponse
    updateReferralCode(
      codeId: ID!
      input: ReferralCodeInputUpdate!
    ): ReferralCodeResponse
    verifyOTP(input: OTPVerificationInput): OTPVerification
    verifyDriverOTP(input: OTPVerificationInput): OTPVerification
    # delete
    deleteUser(userId: ID): Auth!
    deleteDriver(userId: ID): Auth!
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
  }
`;

module.exports = typeDefs;
