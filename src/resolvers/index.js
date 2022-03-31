const { GraphQLScalarType, Kind } = require("graphql");
// create resolvers
const login = require("./user/login");
const driverLogin = require("./driver/driverLogin");
const driverSignup = require("./driver/driverSignup");
const signup = require("./user/signup");
const createMenu = require("./menu/createMenu");
const createRestaurant = require("./restaurant/createRestaurant");
const createTrip = require("./trip/createTrips");
const createCategory = require("./category/createCategory");
const createOffer = require("./offer/createOffer");
const createOrder = require("./order/createOrder");
const createBankDetails = require("./bankDetails/createBankDetails");
const createReferAndEarn = require("./referAndEarn/createReferAndEarn");
const createNotification = require("./notification/createNotification");
const createComplaint = require("./complaint/createComplaint");
const createContactUs = require("./contactus/createContactUs");
const createReferralCode = require("./referralCode/createReferralCode");

// delete resolvers
const deleteUser = require("./user/deleteUser");
const deleteDriver = require("./driver/deleteDriver");
const deleteOffer = require("./offer/deleteOffer");
const deleteCategory = require("./category/deleteCategory");
const deleteRestaurant = require("./restaurant/deleteRestaurant");
const deleteTrip = require("./trip/deleteTrip");
const deleteBankDetails = require("./bankDetails/deleteBankDetails");
const deleteMenu = require("./menu/deleteMenu");
const deleteReferAndEarn = require("./referAndEarn/deleteReferAndEarn");
const deleteNotification = require("./notification/deleteNotification");
const deleteComplaint = require("./complaint/deleteComplaint");
const deleteContactUs = require("./contactus/deleteContactUs");
const deleteReferralCode = require("./referralCode/deleteReferralCode");
// query resolvers
const getUser = require("./user/getUser");
const getDriver = require("./driver/getDriver");
const getAllDrivers = require("./driver/getAllDrivers");
const getAllUsers = require("./user/getAllUsers");
const getTrip = require("./trip/getTrip");
const getOrder = require("./order/getOrder");
const getRestaurant = require("./restaurant/getRestaurant");
const getOffer = require("./offer/getOffer");
const getCategory = require("./category/getCategory");
const getReferAndEarn = require("./referAndEarn/getReferAndEarn");
const getNotification = require("./notification/getNotification");
const getComplaint = require("./complaint/getComplaint");
const getContactUs = require("./contactus/getContactUs");
const getReferralCode = require("./referralCode/updateReferralCode");
const getAllReferAndEarn = require("./referAndEarn/getAllReferAndEarn");
const getAllNotification = require("./notification/getAllNotification");
const getAllComplaint = require("./complaint/getAllComplaint");
const getAllContactUs = require("./contactus/getAllContactUs");
const getAllReferralCode = require("./referralCode/getAllReferralCode");
const getAllCategory = require("./category/getAllCategory");
const getAllMenus = require("./menu/getAllMenus");
const getAllRestaurants = require("./restaurant/getAllRestaurants");
const getAllTrips = require("./trip/getAllTrips");
const getAllOrders = require("./order/getAllOrders");
const getBankDetails = require("./bankDetails/getBankDetails");
const getAllOffers = require("./offer/getAllOffers");
// update resolvers
const updateUser = require("./user/updateUser");
const updateCategory = require("./category/updateCategory");
const updateTrip = require("./trip/updateTrip");
const updateOffer = require("./offer/updateOffer");
const updateOrder = require("./order/updateOrder");
const updateRestaurant = require("./restaurant/updateRestaurant");
const updateBankDetails = require("./bankDetails/updateBankDetails");
const updateMenu = require("./menu/updateMenu");
const updateReferAndEarn = require("./referAndEarn/updateReferAndEarn");
const updateNotification = require("./notification/updateNotification");
const updateComplaint = require("./complaint/updateComplaint");
const updateContactUs = require("./contactus/updateContactUs");
const updateReferralCode = require("./referralCode/updateReferralCode");
const verifyOTP = require("./user/verifyOTP");
const verifyDriverOTP = require("./driver/verifyDriverOTP");
const updateDriver = require("./driver/updateDriver");

const dateScalar = new GraphQLScalarType({
  name: "Date",
  description: "Date custom scalar type",
  serialize(value) {
    return value.getTime(); // Convert outgoing Date to integer for JSON
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
  Query: {
    getUser,
    getAllUsers,
    getDriver,
    getAllDrivers,
    getOffer,
    getTrip,
    getRestaurant,
    getAllRestaurants,
    getCategory,
    getAllMenus,
    getAllTrips,
    getAllOrders,
    getOrder,
    getBankDetails,
    getAllNotification,
    getReferAndEarn,
    getReferralCode,
    getComplaint,
    getNotification,
    getContactUs,
    getCategory,
    getAllCategory,
    getAllOffers,
    getAllComplaint,
    getAllReferAndEarn,
    getAllReferralCode,
    getAllNotification,
    getAllContactUs,
  },
  Mutation: {
    // delete resolvers
    deleteUser,
    deleteDriver,
    deleteOffer,
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
    deleteComplaint,
    deleteNotification,
    deleteReferAndEarn,
    deleteReferralCode,
    // create resolvers
    login,
    signup,
    driverLogin,
    driverSignup,
    createMenu,
    createCategory,
    createOffer,
    createOrder,
    createRestaurant,
    createTrip,
    createBankDetails,
    createNotification,
    createComplaint,
    createReferAndEarn,
    createContactUs,
    createReferralCode,
    // update resolvers
    updateUser,
    updateRestaurant,
    updateDriver,
    updateCategory,
    updateOrder,
    updateTrip,
    updateOffer,
    updateMenu,
    updateComplaint,
    updateContactUs,
    updateNotification,
    updateReferAndEarn,
    updateReferralCode,
    updateBankDetails,
    verifyOTP,
    verifyDriverOTP,
  },
};

module.exports = resolvers;
