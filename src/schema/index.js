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
    id: ID
    firstName: String
    wallet: Float
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
  type RestaurantUser {
    id: ID
    firstName: String!
    wallet: Float
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
    RestaurantAddress: String
    location: Location
    bankDetails: [BankDetail]
  }
  type Driver {
    id: ID!
    firstName: String!
    wallet: Float
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
    location: Location
    invoices: [PaymentResponse]
    previousExperience: String
    bankDetails: [BankDetail]
    documents: [DocumentResponse]
    tips: [Tips]
  }

  type RestaurantResponse {
    token: String!
    user: RestaurantUser!
  }
  type DocumentResponse {
    id: ID
    name: String!
    imageUrl: String!
    status: String!
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
  type Hours {
    from: String
    to: String
    day: String
  }
  type Order {
    id: ID!
    discount: Float
    driverLocation: Location!
    deliveryAddress: Location!
    actualDeliveryTime: Date!
    comment: String
    isMultipleRestaurant: Boolean
    estimatedDeliveryTime: Date
    finalPrice: Float!
    restaurantLocation: [Location]
    orderTime: Date!
    requestOrderId: String!
    deliveryBy: Driver
    orderStatus: String!
    orderItems: [OrderItem]
  }
  type OrderItem {
    name: String!
    restaurant: RestaurantUser
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
  type OnlineStatus {
    message: String!
    status: Float!
    success: Boolean!
  }
  type CheckUserExistResponse {
    status: Float!
    success: Boolean
    isUserExisting: Boolean!
    message: String!
  }
  type PaymentResponse {
    id: ID!
    amount: Float!
    email: String
    paymentType: String
    fees: Float!
    status: String!
    driver: Driver
    restaurant: RestaurantUser
    bankDetails: BankDetail
  }
  type Trip {
    id: ID
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
  type TripResponse {
    trip: Trip!
    accepted: Boolean!
    status: Float!
    message: String!
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
  type AllPayments {
    status: Int!
    currentPage: Int!
    totalPages: Int!
    success: Boolean!
    hasMore: Boolean!
    payments: [PaymentResponse]
  }
  type AllRestaurantsOwners {
    status: Int!
    currentPage: Int!
    totalPages: Int!
    success: Boolean!
    hasMore: Boolean!
    users: [RestaurantUser]
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
    owner: RestaurantUser!
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
  type Location {
    coordinates: [Float]
    formattedAddress: String
  }
  type RestaurantStatsResponse {
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
    day: String!
    totalAmt: Float!
    count: Float!
  }
  type YearStatsCategory {
    year: String!
    totalAmt: Float!
    count: Float!
  }
  type WeekStatsCategory {
    week: WeekMeta
    totalAmt: Float!
    count: Float!
  }
  type StarsTotal {
    avgStars: Float!
    count: Float!
  }
  type Location {
    coordinates: [Float]
    formattedAddress: String
    postCode: String
    city: String
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
  type WeekMeta {
    year: Int!
    week: Int!
  }
  type MonthStatsCategory {
    month: MonthMeta!
    totalAmt: Float!
    count: Float!
  }
  type FeedbacksResponse {
    id: ID!
    stars: Float!
    user: User
    driver: Driver
    restaurant: RestaurantUser
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
    categorizedByWeek: [WeekStatsCategory]
    categorizedByYear: [YearStatsCategory]
  }
  type NotificationResponse {
    id: ID!
    user: User!
    message: String!
    location: Location
    formattedAddress: String
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
  input RestaurantInput {
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
    RestaurantAddress: String!
  }

  input OrderItemInput {
    name: String!
    restaurant: ID!
    discount: Float
    category: ID!
    amount: Float!
  }
  input RestaurantInputUpdate {
    firstName: String
    lastName: String
    username: String
    fullName: String
    email: String
    # isOnline: String
    avatar: String
    isOnline: String
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
    RestaurantAddress: String
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
    paymentType: String
    fees: Float!
    bankDetails: ID!
  }
  input HoursInput {
    from: String
    to: String
    day: String
  }
  input PaymentInputUpdate {
    amount: Float
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
    postCode: String!
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
    postCode: String!
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
    deliveryPostCode: String
    comment: String
    isMultipleRestaurant: Boolean
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
  input CheckUserInput {
    email: String!
    mobile: String!
    userType: String!
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
    checkUserExist(input: CheckUserInput): CheckUserExistResponse
    getAllUsers(limit: Int, skip: Int): AllUsers
    getAllDrivers: AllDrivers
    getAllCategory(limit: Int, skip: Int): AllCategory
    getAllMenus(limit: Int, skip: Int): AllMenus!
    getMenu: Menu!
    getAllTrips(limit: Int, skip: Int): AllTrips!
    getAllCoupons(limit: Int, skip: Int): AllCoupons!
    getAllOrders(limit: Int, skip: Int): AllOrders
    getAllComplaint(limit: Int, skip: Int): AllComplaints
    getAllFeedback(limit: Int, skip: Int): AllFeedbacks
    getAllReferAndEarn(limit: Int, skip: Int): AllReferAndEarn
    getAllReferralCode(limit: Int, skip: Int): AllReferralCode
    getAllNotification(limit: Int, skip: Int): AllNotifications
    getAllContactUs(limit: Int, skip: Int): AllContactUs
    getAllPayments(limit: Int, skip: Int): AllPayments
    getAllRestaurants(
      limit: Int
      skip: Int
      postCode: String
    ): AllRestaurantsOwners
    getRestaurant(RestaurantId: ID!): RestaurantUser
    getUser(userId: ID!): User!
    getDriver(userId: ID!): Driver!
    getBankDetails(bankId: ID): BankDetail
    getCategory(categoryId: ID!): Category
    getCoupon(CouponId: ID!): Coupon
    getTrip(tripId: ID!): Trip
    getOrder(orderId: ID!): Order
    getMyNotifications: AllNotifications
    getMyOrders: AllOrders
    getMyTrips(status: String): AllTrips
    getRestaurantFeedbackStats: FeedbackStatsResponse
    getRestaurantStats: RestaurantStatsResponse
    getMyPayments: AllPayments
    getPayment(paymentId: ID!): PaymentResponse
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
    RestaurantLogin(input: LoginInput): RestaurantResponse!
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
    createRestaurant(input: RestaurantInput): RestaurantResponse
    createPayment(input: PaymentInput): PaymentResponse
    getCurrentLocation(input: String): String
    # update
    updateUser(input: UpdateUserInput!): Auth!
    updateDriver(input: UpdateDriverInput!): DriverAuth!
    updateMenu(menuId: ID!, input: MenuInputUpdate!): Menu!
    updateCategory(categoryId: ID!, input: CategoryInput!): Category!
    updateTrip(tripId: ID!, input: TripUpdateInput!): Trip!
    updateCoupon(CouponId: ID!, input: CouponInputUpdate!): Coupon!
    updateOnlineStatus(status: String): OnlineStatus
    updateOrder(orderId: ID!, input: OrderInput!): Order!
    orderControl(orderId: ID!, status: String): Order!
    tripControl(tripId: ID!, status: String): TripResponse!
    updateRestaurant(
      RestaurantId: ID!
      input: RestaurantInputUpdate!
    ): RestaurantUser!
    updateBankDetails(bankId: ID!, input: BankDetailInput!): BankDetail
    updatePayment(paymentId: ID!, input: PaymentInputUpdate!): PaymentResponse
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
    deleteRestaurant(RestaurantId: ID): RestaurantUser
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
    deletePayment(paymentId: ID): PaymentResponse
  }
`;

module.exports = typeDefs;
