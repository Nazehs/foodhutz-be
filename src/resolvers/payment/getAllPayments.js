const { ApolloError, AuthenticationError } = require("apollo-server-express");
const { Payment } = require("../../models");

const getAllPayments = async (_, { limit = 10, skip = 0 }, { user }) => {
  try {
    if (!user) {
      throw new AuthenticationError("Unauthorised to perform this operation");
    }
    const invoicesCount = await Payment.count();
    const docs = await Payment.find({})
      .populate("bankDetails")
      .populate("driver")
      .populate("restaurant");

    const totalPages = Math.ceil(invoicesCount / limit);
    const currentPage = Math.ceil(invoicesCount % (skip + 1));

    return {
      status: 0,
      payments: docs,
      success: true,
      status: 0,
      currentPage: currentPage == 0 ? currentPage + 1 : currentPage,
      totalPages,
      hasMore: invoicesCount >= limit + 1,
    };
  } catch (error) {
    console.log(`[ERROR]: Failed to get payment details | ${error.message}`);
    throw new ApolloError(`Failed to get payment details || ${error.message}`);
  }
};
module.exports = getAllPayments;
