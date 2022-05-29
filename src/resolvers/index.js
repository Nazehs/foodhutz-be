const { GraphQLScalarType, Kind } = require("graphql");
const { GraphQLUpload } = require("graphql-upload");
// create resolvers
const userLogin = require("./user/login");
const sendOTP = require("./user/sendOTP");
const driverLogin = require("./driver/driverLogin");
const RestaurantLogin = require("./restaurant/RestaurantLogin");
const driverSignup = require("./driver/driverSignup");
const userSignup = require("./user/signup");
const updateOnlineStatus = require("./updateOnlineStatus");
const createMenu = require("./menu/createMenu");
const createTrip = require("./trip/createTrips");
const createCategory = require("./category/createCategory");
const createCoupon = require("./coupon/createCoupon");
const createOrder = require("./order/createOrder");
const createBankDetails = require("./bankDetails/createBankDetails");
const createReferAndEarn = require("./referAndEarn/createReferAndEarn");
const createNotification = require("./notification/createNotification");
const createComplaint = require("./complaint/createComplaint");
const createFeedback = require("./feedback/createFeedback");
const createContactUs = require("./contactus/createContactUs");
const createReferralCode = require("./referralCode/createReferralCode");
const createRestaurant = require("./restaurant/createRestaurant");
const createPayment = require("./payment/createPayment");
const singleUpload = require("./fileUpload/singleUpload");
// delete resolvers
const deleteUser = require("./user/deleteUser");
const deleteDriver = require("./driver/deleteDriver");
const deleteCoupon = require("./coupon/deleteCoupon");
const deleteCategory = require("./category/deleteCategory");
const deleteTrip = require("./trip/deleteTrip");
const deleteBankDetails = require("./bankDetails/deleteBankDetails");
const deleteMenu = require("./menu/deleteMenu");
const deleteReferAndEarn = require("./referAndEarn/deleteReferAndEarn");
const deleteNotification = require("./notification/deleteNotification");
const deleteComplaint = require("./complaint/deleteComplaint");
const deleteFeedback = require("./feedback/deleteFeedback");
const deleteContactUs = require("./contactus/deleteContactUs");
const deleteReferralCode = require("./referralCode/deleteReferralCode");
const deleteRestaurant = require("./restaurant/deleteRestaurant");
const deletePayment = require("./payment/deletePayment");
// query resolvers
const getUser = require("./user/getUser");
const getDriver = require("./driver/getDriver");
const getAllDrivers = require("./driver/getAllDrivers");
const getDriverStats = require("./driver/getDriverStats");
const getAllUsers = require("./user/getAllUsers");
const getTrip = require("./trip/getTrip");
const getOrder = require("./order/getOrder");
const getRestaurant = require("./restaurant/getRestaurant");
const getRestaurantStats = require("./restaurant/getRestaurantStats");
const getCoupon = require("./coupon/getCoupon");
const getMyPayments = require("./payment/getMyPayments");
const getPayment = require("./payment/getPayment");
const getCategory = require("./category/getCategory");
const getReferAndEarn = require("./referAndEarn/getReferAndEarn");
const getNotification = require("./notification/getNotification");
const getMyNotifications = require("./notification/getMyNotifications");
const getComplaint = require("./complaint/getComplaint");
const getFeedback = require("./feedback/getFeedback");
const getRestaurantFeedbackStats = require("./feedback/getRestaurantFeedbackStats");
const getDriverFeedbackStats = require("./feedback/getDriverFeedbackStats");
const getContactUs = require("./contactus/getContactUs");
const getReferralCode = require("./referralCode/updateReferralCode");
const getAllReferAndEarn = require("./referAndEarn/getAllReferAndEarn");
const getAllNotification = require("./notification/getAllNotification");
const getAllComplaint = require("./complaint/getAllComplaint");
const getAllFeedback = require("./feedback/getAllFeedbacks");
const getMyFeedback = require("./feedback/getMyFeedback");
const getAllContactUs = require("./contactus/getAllContactUs");
const getAllReferralCode = require("./referralCode/getAllReferralCode");
const getAllCategory = require("./category/getAllCategory");
const getAllMenus = require("./menu/getAllMenus");
const getMenu = require("./menu/getMenu");
const getAllTrips = require("./trip/getAllTrips");
const getMyTrips = require("./trip/getMyTrips");
const getAllOrders = require("./order/getAllOrders");
const getMyOrders = require("./order/getMyOrders");
const getBankDetails = require("./bankDetails/getBankDetails");
const getAllCoupons = require("./coupon/getAllCoupons");
const getAllRestaurants = require("./restaurant/getAllRestaurant");
const getAllPayments = require("./payment/getAllPayments");
// update resolvers
const updateUser = require("./user/updateUser");
const updateCategory = require("./category/updateCategory");
const updateTrip = require("./trip/updateTrip");
const updateCoupon = require("./coupon/updateCoupon");
const updateOrder = require("./order/updateOrder");
const orderControl = require("./order/orderControl");
const updateBankDetails = require("./bankDetails/updateBankDetails");
const updateMenu = require("./menu/updateMenu");
const updateReferAndEarn = require("./referAndEarn/updateReferAndEarn");
const updateNotification = require("./notification/updateNotification");
const updateComplaint = require("./complaint/updateComplaint");
const updateFeedback = require("./feedback/updateFeedback");
const updateContactUs = require("./contactus/updateContactUs");
const updateReferralCode = require("./referralCode/updateReferralCode");
const verifyOTPUser = require("./user/verifyOTP");
const verifyDriverOTP = require("./driver/verifyDriverOTP");
const updateDriver = require("./driver/updateDriver");
const tripControl = require("./trip/tripControl");
const checkUserExist = require("./userCheck");
const updateRestaurant = require("./restaurant/updateRestaurant");
const getCurrentLocation = require("./location/getCurrentLocation");
const updatePayment = require("./payment/updatePayment");
const dateScalar = new GraphQLScalarType({
  name: "Date",
  description: "Date custom scalar type",
  serialize(value) {
    return value; // Convert outgoing Date to integer for JSON
  },
  parseValue(value) {
    return new Date(value); // Convert incoming integer to Date
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.INT) {
      return new Date(parseInt(ast.value, 10)); // Convert hard-coded AST string to integer and then to Date
    }
    return null; // Invalid hard-coded value (not an integer)
  },
});
const resolvers = {
  Date: dateScalar,
  Upload: GraphQLUpload,
  Query: {
    getUser,
    getAllUsers,
    getDriver,
    getAllDrivers,
    getCoupon,
    getTrip,
    getCategory,
    getAllMenus,

    getAllTrips,
    getAllOrders,
    getOrder,
    getRestaurant,
    getRestaurantFeedbackStats,
    getRestaurantStats,
    getBankDetails,
    getAllNotification,
    getReferAndEarn,
    getReferralCode,
    getComplaint,
    getFeedback,
    getNotification,
    getMyNotifications,
    getMyOrders,
    getMyTrips,
    getMenu,
    getContactUs,
    getCategory,
    getAllCategory,
    getAllCoupons,
    getAllComplaint,
    getAllFeedback,
    getMyFeedback,
    getAllReferAndEarn,
    getAllReferralCode,
    checkUserExist,
    getAllNotification,
    getAllContactUs,
    getAllRestaurants,
    getDriverStats,
    getDriverFeedbackStats,
    getMyPayments,
    getAllPayments,
    getPayment,
  },
  Mutation: {
    // delete resolvers
    deleteUser,
    deleteDriver,
    deleteCoupon,
    deleteCategory,
    deleteRestaurant,
    deleteTrip,
    deleteBankDetails,
    deleteMenu,
    deleteContactUs,
    deleteComplaint,
    deleteNotification,
    deleteReferralCode,
    deleteReferAndEarn,
    deleteFeedback,
    deleteNotification,
    deleteReferAndEarn,
    deleteReferralCode,
    deletePayment,
    // create resolvers
    singleUpload,
    userLogin,
    userSignup,
    RestaurantLogin,
    driverLogin,
    driverSignup,
    createMenu,
    createCategory,
    createCoupon,
    createOrder,
    orderControl,
    createTrip,
    createBankDetails,
    createNotification,
    createComplaint,
    createFeedback,
    createReferAndEarn,
    createContactUs,
    createReferralCode,
    createRestaurant,
    createPayment,
    getCurrentLocation,
    // update resolvers
    updateUser,
    updateOnlineStatus,
    updateDriver,
    updateCategory,
    updateOrder,
    updateTrip,
    tripControl,
    updateCoupon,
    updateMenu,
    updateComplaint,
    updateFeedback,
    updateContactUs,
    updateNotification,
    updateReferAndEarn,
    updateReferralCode,
    updateBankDetails,
    updateRestaurant,
    updatePayment,
    verifyOTPUser,
    verifyDriverOTP,
    sendOTP,
  },
};

module.exports = resolvers;
