const { ApolloError, AuthenticationError } = require("apollo-server-express");

const { Coupon } = require("../../models");

const getCoupons = async (_, { CouponId }, { user }) => {
  try {
    if (!user) {
      throw new AuthenticationError("Unauthorised to perform this operation");
    }

    return await Coupon.findById(CouponId);
  } catch (error) {
    console.log(`[ERROR]: Failed to get Coupon details| ${error.message}`);
    throw new ApolloError("Failed to get Coupon details");
  }
};

module.exports = getCoupons;
