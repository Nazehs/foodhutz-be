const { ApolloError, AuthenticationError } = require("apollo-server-express");
const { Payment } = require("../../models");

const getMyPayments = async (_, { limit = 10, skip = 0 }, { user }) => {
  try {
    if (!user) {
      throw new AuthenticationError("Unauthorised to perform this operation");
    }
    let doc;
    if (user.userType.toUpperCase() === "DRIVER") {
      doc = await Payment.find({})
        .populate("bankDetails")
        .populate("driver")
        .populate("restaurant")
        .skip(skip)
        .limit(limit)
        .sort("desc");
    }
    if (user.userType.toUpperCase() === "RESTAURANT") {
      doc = await Payment.find({})
        .populate("bankDetails")
        .populate("driver")
        .populate("restaurant")
        .skip(skip)
        .limit(limit)
        .sort("desc");
    }
    const invoicesCount = doc.length;

    const totalPages = Math.ceil(invoicesCount / limit);
    const currentPage = Math.ceil(invoicesCount % (skip + 1));

    return {
      status: 0,
      payments: doc,
      success: true,
      status: 0,
      currentPage: currentPage == 0 ? currentPage + 1 : currentPage,
      totalPages,
      hasMore: invoicesCount >= limit + 1,
    };
  } catch (error) {
    console.log(`[ERROR]: Failed to get payment  | ${error.message}`);
    throw new ApolloError(`Failed to get payment  || ${error.message}`);
  }
};
module.exports = getMyPayments;
