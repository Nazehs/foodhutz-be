const { ApolloError, AuthenticationError } = require("apollo-server-express");

const { Coupon } = require("../../models");

const getAllCoupons = async (_, { skip = 0, limit = 10 }, { user }) => {
  try {
    if (!user) {
      throw new AuthenticationError("Unauthorised to perform this operation");
    }

    const docs = await Coupon.find({})
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });
    const docsCount = await Coupon.count();
    const totalPages = Math.ceil(docsCount / limit);
    const currentPage = Math.ceil(docsCount % (skip + 1));

    return {
      status: 0,
      success: true,
      coupon: docs,
      currentPage: currentPage == 0 ? currentPage + 1 : currentPage,
      totalPages,
      hasMore: docsCount >= limit + 1,
    };
  } catch (error) {
    console.log(`[ERROR]: Failed to get Coupon details| ${error.message}`);
    throw new ApolloError("Failed to get Coupon details");
  }
};

module.exports = getAllCoupons;
