const { GraphQLScalarType, Kind } = require("graphql");
const { GraphQLUpload } = require("graphql-upload");
// create resolvers
const userLogin = require("./user/login");
const sendOTP = require("./user/sendOTP");
const driverLogin = require("./driver/driverLogin");
const storeOwnerLogin = require("./restaurant/storeOwnerLogin");
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
const createStoreOwner = require("./restaurant/createStoreOwner");
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
const deleteStoreOwner = require("./restaurant/deleteStoreOwner");
// query resolvers
const getUser = require("./user/getUser");
const getDriver = require("./driver/getDriver");
const getAllDrivers = require("./driver/getAllDrivers");
const getDriverStats = require("./driver/getDriverStats");
const getAllUsers = require("./user/getAllUsers");
const getTrip = require("./trip/getTrip");
const getOrder = require("./order/getOrder");
const getStoreOwner = require("./restaurant/getStoreOwner");
const getStoreOwnerStats = require("./restaurant/getStoreStats");
const getCoupon = require("./coupon/getCoupon");
const getCategory = require("./category/getCategory");
const getReferAndEarn = require("./referAndEarn/getReferAndEarn");
const getNotification = require("./notification/getNotification");
const getMyNotifications = require("./notification/getMyNotifications");
const getComplaint = require("./complaint/getComplaint");
const getFeedback = require("./feedback/getFeedback");
const getStoreFeedbackStats = require("./feedback/getStoreFeedbackStats");
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
const getAllTrips = require("./trip/getAllTrips");
const getMyTrips = require("./trip/getMyTrips");
const getAllOrders = require("./order/getAllOrders");
const getMyOrders = require("./order/getMyOrders");
const getBankDetails = require("./bankDetails/getBankDetails");
const getAllCoupons = require("./coupon/getAllCoupons");
const getAllStoreOwners = require("./restaurant/getAllStoreOwner");
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
const updateStoreOwner = require("./restaurant/updateStoreOwner");
const getCurrentLocation = require("./location/getCurrentLocation");
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
    getStoreOwner,
    getStoreFeedbackStats,
    getStoreOwnerStats,

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
    getAllStoreOwners,
    getDriverStats,
    getDriverFeedbackStats,
  },
  Mutation: {
    // delete resolvers
    deleteUser,
    deleteDriver,
    deleteCoupon,
    deleteCategory,
    deleteStoreOwner,
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
    // create resolvers
    singleUpload,
    userLogin,
    userSignup,
    storeOwnerLogin,
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
    createStoreOwner,
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
    updateStoreOwner,
    verifyOTPUser,
    verifyDriverOTP,
    sendOTP,
  },
};

module.exports = resolvers;
