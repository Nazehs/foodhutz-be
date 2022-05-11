const { gql } = require("apollo-server-express");

const typeDefs = gql`
  scalar Date
  scalar Upload
  type File {
    filename: String!
    mimetype: String!
    encoding: String!
  }
  type Suspended {
    reason: String
  }
  type IsBlocked {
    message: String
    blockedByUser: User
  }
  type IsWrongCredential {
    message: String
  }
  type UnavailableInCountry {
    countryCode: Int
    message: String
  }
  type User {
    id: ID
    firstName: String
    lastName: String
    username: String
    email: String!
    avatar: String
    fullName: String!
    phoneNumber: String!
    userType: String!
    orders: [Order]
    dateOfJoin: Date
  }
  type StoreUser {
    id: ID
    firstName: String!
    lastName: String!
    username: String!
    fullName: String
    email: String!
    avatar: String
    phoneNumber: String!
    userType: String!
    orders: [Order]
    feedbacks: [FeedbacksResponse]
    description: String
    dateOfJoin: Date
    businessType: String!
    notifications: [NotificationResponse]
    termsAccepted: Boolean
    status: String!
    documents: [DocumentResponse]
    categories: [Category]
    coupons: [Coupon]
    menus: [Menu]
    openingHours: [Hours]
    storeName: String
    postCode: String!
    storeAddress: String
    bankDetails: [BankDetail]
  }
  type Driver {
    id: ID!
    firstName: String!
    lastName: String!
    username: String!
    fullName: String
    email: String!
    avatar: String
    address: String!
    phoneNumber: String!
    userType: String!
    trips: [Trip]
    dateOfJoin: Date
    vehicleType: String
    needEquipment: String
    vehicleNumber: String
    jobType: String
    requestedFor: String
    previousExperience: String
    bankDetails: [BankDetail]
    documents: [DocumentResponse]
    tips: [Tips]
  }

  type StoreOwnerResponse {
    token: String!
    user: StoreUser!
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
  type DriverAuth {
    token: ID!
    user: Driver!
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
    coupons: [Coupon]
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
    discount: Float
    deliveryAddress: String!
    actualDeliveryTime: Date!
    comment: String
    estimatedDeliveryTime: Date
    finalPrice: Float!
    orderTime: Date!
    deliveryBy: Driver
    orderStatus: String!
    orderItems: [OrderItem]
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
    generatedDate: Date!
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
    duration: String
    distance: String
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
  type AllFeedbacks {
    status: Int!
    success: Boolean!
    currentPage: Int!
    totalPages: Int!
    hasMore: Boolean!
    feedbacks: [FeedbacksResponse]
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
    users: [StoreUser]
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

  type OTPResponse {
    status: Int!
    success: Boolean!
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
  type StoreOwnerStatsResponse {
    totalProcessed: [StatsItem]
    totalCancelled: [StatsItem]
    totalMissed: [StatsItem]
    totalOrders: [StatsItem]
    totalAmountAccepted: [StatsItem]
    categorizedByDay: [DayStatsCategory]
    categorizedByMonth: [MonthStatsCategory]
  }

  type FeedbackStatsResponse {
    totalDelivered: [FeedbackStatsItem]
    totalCancelled: [FeedbackStatsItem]
    avgFeedback: [StarsTotal]
    totalOrders: [FeedbackStatsItem]
    # totalAmountAccepted: [StatsItem]
    starsCategory: [StarsCategory]
  }
  type StatsItem {
    totalAmt: Float!
    count: Float!
  }
  type FeedbackStatsItem {
    # totalAmt: Float!
    count: Float!
  }
  type DayStatsCategory {
    _id: String!
    totalAmt: Float!
    count: Float!
  }
  type StarsTotal {
    avgStars: Float!
    count: Float!
  }
  type StarsCategory {
    stars: Float!
    count: Float!
  }
  type FeedbackStatsItem {
    count: Float!
  }
  type MonthMeta {
    month: Int
    day: Int!
    year: Int!
  }
  type MonthStatsCategory {
    _id: MonthMeta!
    totalAmt: Float!
    count: Float!
  }
  type FeedbacksResponse {
    id: ID!
    stars: Float!
    user: User
    driver: Driver
    restaurant: StoreUser
    message: String
    order: Order
  }
  type DriverStatsResponse {
    totalProcessed: [StatsItem]
    totalCancelled: [StatsItem]
    totalMissed: [StatsItem]
    totalTrips: [StatsItem]
    totalAmountAccepted: [StatsItem]
    categorizedByDay: [DayStatsCategory]
    categorizedByMonth: [MonthStatsCategory]
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
    fullName: String
    email: String!
    avatar: String
    phoneNumber: String!
    password: String
    businessType: String!
    city: String!
    storeName: String!
    description: String
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
    fullName: String
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
    description: String
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
    category: ID!
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
    category: ID
    dateActiveTo: Date
    CouponPrice: Float
  }
  input LoginInput {
    email: String
    password: String!
    phoneNumber: String
  }
  input SignupInput {
    firstName: String
    lastName: String
    username: String
    fullName: String!
    phoneNumber: String
    email: String!
    avatar: String
    address: String
    password: String!
  }

  input SignupInputDriver {
    firstName: String!
    lastName: String!
    username: String!
    fullName: String
    phoneNumber: String
    email: String!
    avatar: String
    address: String
    password: String!
  }

  input UpdateUserInput {
    firstName: String
    lastName: String
    username: String
    fullName: String
    phoneNumber: String
    email: String
    password: String
  }

  input UpdateDriverInput {
    firstName: String
    lastName: String
    username: String
    fullName: String
    phoneNumber: String
    email: String
    jobType: String
    requestedFor: String
    previousExperience: String
    password: String
    needEquipment: String
    vehicleType: String
    documents: [DocumentInput]
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
    comment: String
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

  input OTPInput {
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

  input FeedbacksInput {
    stars: Float!
    driver: ID
    restaurant: ID
    message: String
    order: ID!
  }

  input FeedbacksInputUpdate {
    stars: Float
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
    getAllFeedback(limit: Int, skip: Int): AllFeedbacks
    getAllReferAndEarn(limit: Int, skip: Int): AllReferAndEarn
    getAllReferralCode(limit: Int, skip: Int): AllReferralCode
    getAllNotification(limit: Int, skip: Int): AllNotifications
    getAllContactUs(limit: Int, skip: Int): AllContactUs
    getAllStoreOwners: AllStoresOwners
    getStoreOwner(storeId: ID!): StoreUser
    getUser(userId: ID!): User!
    getDriver(userId: ID!): Driver!
    getBankDetails(bankId: ID): BankDetail
    getCategory(categoryId: ID!): Category
    getCoupon(CouponId: ID!): Coupon
    getTrip(tripId: ID!): Trip
    getOrder(orderId: ID!): Order
    getMyNotifications: AllNotifications
    getMyOrders: AllOrders
    getMyTrips: AllTrips
    getStoreFeedbackStats: FeedbackStatsResponse
    getStoreOwnerStats: StoreOwnerStatsResponse
    getDriverStats: DriverStatsResponse
    getDriverFeedbackStats: FeedbackStatsResponse
    getReferAndEarn(referralId: ID!): ReferAndEarnResponse
    getReferralCode(codeId: ID!): ReferralCodeResponse
    getComplaint(complaintId: ID!): ComplaintsResponse
    getFeedback(feedbackId: ID!): FeedbacksResponse
    getMyFeedback: AllFeedbacks
    getNotification(notificationId: ID!): NotificationResponse
    getContactUs(messageId: ID!): ContactUsResponse
  }
  type Mutation {
    # create
    singleUpload(input: DocumentUploadInput!): DocumentResponse!
    userLogin(input: LoginInput!): Auth!
    storeOwnerLogin(input: LoginInput): StoreOwnerResponse!
    driverLogin(input: LoginInput!): DriverAuth!
    userSignup(input: SignupInput!): Auth!
    driverSignup(input: SignupInputDriver!): DriverAuth!
    createMenu(input: MenuInput): Menu!
    createCategory(input: CategoryInput): Category!
    createCoupon(input: CouponInput): Coupon!
    createTrip(input: TripInput): Trip!
    createOrder(input: OrderInput): Order
    createBankDetails(input: BankDetailInput): BankDetail
    createNotification(input: NotificationInput): NotificationResponse
    createComplaint(input: ComplaintsInput): ComplaintsResponse
    createFeedback(input: FeedbacksInput): FeedbacksResponse
    createReferAndEarn(input: ReferAndEarnInput): ReferAndEarnResponse
    createContactUs(input: ContactUsInput): ContactUsResponse
    createReferralCode(input: ReferralCodeInput): ReferralCodeResponse
    createStoreOwner(input: StoreOwnerInput): StoreOwnerResponse
    getCurrentLocation(input: String): String
    # update
    updateUser(input: UpdateUserInput!): Auth!
    updateDriver(input: UpdateDriverInput!): DriverAuth!
    updateMenu(menuId: ID!, input: MenuInputUpdate!): Menu!
    updateCategory(categoryId: ID!, input: CategoryInput!): Category!
    updateTrip(tripId: ID!, input: TripUpdateInput!): Trip!
    updateCoupon(CouponId: ID!, input: CouponInputUpdate!): Coupon!
    updateOrder(orderId: ID!, input: OrderInput!): Order!
    orderControl(orderId: ID!, status: String): Order!
    tripControl(tripId: ID!, status: String): Trip!
    updateStoreOwner(storeId: ID!, input: StoreOwnerInputUpdate!): StoreUser!
    updateBankDetails(bankId: ID!, input: BankDetailInput!): BankDetail
    updateComplaint(
      complaintId: ID!
      input: ComplaintsInputUpdate!
    ): ComplaintsResponse
    updateFeedback(
      feedbackId: ID!
      input: FeedbacksInputUpdate!
    ): FeedbacksResponse
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
    sendOTP(input: OTPInput): OTPResponse
    # delete
    deleteUser(userId: ID): Auth!
    deleteDriver(userId: ID): DriverAuth!
    deleteCoupon(CouponId: ID): Coupon!
    deleteStoreOwner(storeId: ID): StoreUser
    deleteCategory(categoryId: ID): Category!
    deleteTrip(tripId: ID): Trip!
    deleteBankDetails(bankId: ID!): BankDetail
    deleteMenu(menuId: ID!): Menu
    deleteContactUs(messageId: ID!): ContactUsResponse
    deleteComplaint(complaintId: ID!): ComplaintsResponse
    deleteFeedback(feedbackId: ID!): FeedbacksResponse
    deleteNotification(notificationId: ID!): NotificationResponse
    deleteReferAndEarn(referralId: ID!): ReferAndEarnResponse
    deleteReferralCode(codeId: ID): ReferralCodeResponse
  }
`;

module.exports = typeDefs;
