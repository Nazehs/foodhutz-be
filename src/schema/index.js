const { gql } = require("apollo-server-express");

const typeDefs = gql`
  scalar Date
  scalar Upload
  type File {
    filename: String!
    mimetype: String!
    encoding: String!
  }

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
    documents: [DocumentResponse]
    tips: [Tips]
  }

  type StoreOwnerResponse {
    id: ID!
    firstName: String!
    lastName: String!
    username: String!
    email: String!
    avatar: String
    phoneNumber: String!
    businessType: String!
    dateOfJoin: Date
    notifications: [NotificationResponse]
    termsAccepted: Boolean
    status: String!
    documents: [DocumentResponse]
    categories: [Category]
    orders: [Order]
    coupon: [Coupon]
    menus: [Menu]
    openingHours: [Hours]
    storeName: String
    postCode: String!
    storeAddress: String
    bankDetails: [BankDetail]
  }
  type DocumentResponse {
    name: String
    imageUrl: String
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
    storeName: String!
    email: String!
    city: String!
    storeAddress: String!
    businessType: String!
    avatar: String!
    postCode: String!
    phoneNumber: String!
    userType: String!
    categories: [Category]
    orders: [Order]
    coupon: [Coupon]
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
    # name: String!
    # restaurant: Restaurant
    discount: Float
    deliveryAddress: String!
    actualDeliveryTime: Date!
    # category: Category!
    comment: String
    # customer: User!
    estimatedDeliveryTime: Date
    finalPrice: Float!
    orderTime: Date!
    deliveryBy: Driver
    orderStatus: String!
    orderItems: [OrderItem]
    # rating: Float
  }
  type OrderItem {
    name: String!
    restaurant: Restaurant
    discount: Float
    category: Category!
    comment: String
    customer: User!
    amount: Float!
  }
  type Coupon {
    id: ID!
    name: String!
    timeActiveTo: Date!
    dateActiveFrom: Date!
    timeActiveFrom: Date!
    dateActiveTo: Date!
    CouponPrice: Float!
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
    category: Category
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
  type AllCoupons {
    status: Int!
    currentPage: Int!
    totalPages: Int!
    success: Boolean!
    hasMore: Boolean!
    coupon: [Coupon]
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
  type AllStoresOwners {
    status: Int!
    currentPage: Int!
    totalPages: Int!
    success: Boolean!
    hasMore: Boolean!
    stores: [StoreOwnerResponse]
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
    order: Order
  }
  type NotificationResponse {
    id: ID!
    user: User!
    message: String!
    order: Order
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
  input StoreOwnerInput {
    firstName: String!
    lastName: String!
    username: String!
    email: String!
    avatar: String
    phoneNumber: String!
    password: String
    businessType: String!
    storeName: String!
    postCode: String!
    storeAddress: String!
  }

  input OrderItemInput {
    name: String!
    restaurant: ID!
    discount: Float
    category: ID!
    amount: Float!
  }
  input StoreOwnerInputUpdate {
    firstName: String
    lastName: String
    username: String
    email: String
    avatar: String
    password: String
    phoneNumber: String
    businessType: String
    notifications: [NotificationInput]
    termsAccepted: Boolean
    status: String
    documents: [DocumentInput]
    categories: [ID!]
    orders: [ID!]
    coupon: [ID!]
    menus: [ID!]
    openingHours: [HoursInput]
    storeName: String
    postCode: String
    storeAddress: String
  }
  input RestaurantInput {
    name: String
    email: String
    city: String
    address: String
    phoneNumber: String
    categories: [ID]
    orders: [ID]
    coupon: [ID]
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
  input HoursInput {
    from: String
    to: String
    day: String
  }
  input PaymentInputUpdate {
    amount: Float
    user: ID
    email: String
    paymentType: String
    fees: Float
    status: String
  }
  input CouponInput {
    name: String!
    timeActiveTo: Date!
    dateActiveFrom: Date!
    timeActiveFrom: Date!
    dateActiveTo: Date!
    CouponPrice: Float!
  }
  input DocumentInput {
    name: String!
    url: String!
  }
  input DocumentInputUpdate {
    name: String
    url: String
  }
  input CouponInputUpdate {
    name: String
    timeActiveTo: Date
    dateActiveFrom: Date
    timeActiveFrom: Date
    dateActiveTo: Date
    CouponPrice: Float
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
    orderItems: [OrderItemInput]
    deliveryAddress: String
    # actualDeliveryTime: Date
    comment: String
    # estimatedDeliveryTime: Date
    finalPrice: Float
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
  }
  input ReferralCodeInputUpdate {
    code: String
    value: Float
  }
  input ReferAndEarnInput {
    code: String!
    phoneNumber: String
    email: String
  }
  input ReferAndEarnInputUpdate {
    code: String
    phoneNumber: String
    email: String
  }
  input ContactUsInput {
    queryType: String!
    message: String!
  }
  input ContactUsInputUpdate {
    queryType: String
    message: String
  }
  input ComplaintsInput {
    complaintType: String!
    message: String!
    order: ID!
  }

  input ComplaintsInputUpdate {
    complaintType: String
    message: String
    order: ID
  }
  input NotificationInput {
    user: ID!
    message: String!
    order: ID!
  }
  input DocumentUploadInput {
    document: Upload
    documentType: String
  }
  type Query {
    getAllUsers(limit: Int, skip: Int): AllUsers
    getAllDrivers: AllDrivers
    getAllCategory(limit: Int, skip: Int): AllCategory
    getAllMenus(limit: Int, skip: Int): AllMenus!
    getAllTrips(limit: Int, skip: Int): AllTrips!
    getAllCoupons(limit: Int, skip: Int): AllCoupons!
    getAllOrders(limit: Int, skip: Int): AllOrders
    getAllComplaint(limit: Int, skip: Int): AllComplaints
    getAllReferAndEarn(limit: Int, skip: Int): AllReferAndEarn
    getAllReferralCode(limit: Int, skip: Int): AllReferralCode
    getAllNotification(limit: Int, skip: Int): AllNotifications
    getAllContactUs(limit: Int, skip: Int): AllContactUs
    # getAllRestaurants(limit: Int, skip: Int): AllRestaurants!
    getAllStoreOwners: AllStoresOwners
    getStoreOwner(storeId: ID!): StoreOwnerResponse
    getUser(userId: ID!): User!
    getDriver(userId: ID!): Driver!
    getBankDetails(bankId: ID): BankDetail
    getCategory(categoryId: ID!): Category
    getCoupon(CouponId: ID!): Coupon
    getTrip(tripId: ID!): Trip
    getOrder(orderId: ID!): Order
    # getRestaurant(restaurantId: ID!): Restaurant
    getReferAndEarn(referralId: ID!): ReferAndEarnResponse
    getReferralCode(codeId: ID!): ReferralCodeResponse
    getComplaint(complaintId: ID!): ComplaintsResponse
    getNotification(notificationId: ID!): NotificationResponse
    getContactUs(messageId: ID!): ContactUsResponse
  }
  type Mutation {
    # create
    singleUpload(input: DocumentUploadInput!): DocumentResponse!
    userLogin(input: LoginInput!): Auth!
    storeOwnerLogin(input: LoginInput): Auth!
    driverLogin(input: LoginInput!): Auth
    userSignup(input: SignupInput!): Auth!
    driverSignup(input: SignupInput!): Auth!
    createMenu(input: MenuInput): Menu!
    createCategory(input: CategoryInput): Category!
    createCoupon(input: CouponInput): Coupon!
    createTrip(input: TripInput): Trip!
    createOrder(input: OrderInput): Order
    createBankDetails(input: BankDetailInput): BankDetail
    createNotification(input: NotificationInput): NotificationResponse
    createComplaint(input: ComplaintsInput): ComplaintsResponse
    createReferAndEarn(input: ReferAndEarnInput): ReferAndEarnResponse
    createContactUs(input: ContactUsInput): ContactUsResponse
    createReferralCode(input: ReferralCodeInput): ReferralCodeResponse
    createStoreOwner(input: StoreOwnerInput): StoreOwnerResponse
    # update
    updateUser(input: UpdateUserInput!): Auth!
    updateDriver(input: UpdateUserInput!): Auth!
    updateMenu(menuId: ID!, input: MenuInputUpdate!): Menu!
    # updateRestaurant(restaurantId: ID!, input: RestaurantInput!): Restaurant!
    updateCategory(categoryId: ID!, input: CategoryInput!): Category!
    updateTrip(tripId: ID!, input: TripUpdateInput!): Trip!
    updateCoupon(CouponId: ID!, input: CouponInputUpdate!): Coupon!
    updateOrder(orderId: ID!, input: OrderInput!): Order!
    orderControl(orderId: ID!, status: String): Order!
    tripControl(tripId: ID!, status: String): Trip!
    updateStoreOwner(
      storeId: ID!
      input: StoreOwnerInputUpdate!
    ): StoreOwnerResponse!
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
    verifyOTPUser(input: OTPVerificationInput): OTPVerification
    verifyDriverOTP(input: OTPVerificationInput): OTPVerification
    # delete
    deleteUser(userId: ID): Auth!
    deleteDriver(userId: ID): Auth!
    deleteCoupon(CouponId: ID): Coupon!
    deleteStoreOwner(storeId: ID): StoreOwnerResponse
    deleteCategory(categoryId: ID): Category!
    # deleteRestaurant(restaurantId: ID): Restaurant!
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
