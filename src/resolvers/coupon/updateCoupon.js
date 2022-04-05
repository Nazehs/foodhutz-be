const { ApolloError, AuthenticationError } = require("apollo-server-express");

const { Coupon } = require("../../models");

const updateCoupon = async (_, { CouponId, input }, { user }) => {
  try {
    if (!user) {
      throw new AuthenticationError("Unauthorised to perform this operation");
    }

    return await Coupon.findByIdAndUpdate(CouponId, input, { new: true });
  } catch (error) {
    console.log(`[ERROR]: Failed to get Coupon details| ${error.message}`);
    throw new ApolloError("Failed to get Coupon details");
  }
};

module.exports = updateCoupon;
