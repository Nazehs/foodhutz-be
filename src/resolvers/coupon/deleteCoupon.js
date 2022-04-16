const { ApolloError, AuthenticationError } = require("apollo-server-express");

const { Coupon, StoreOwner } = require("../../models");

const deleteCoupons = async (_, { CouponId }, { user }) => {
  try {
    if (!user) {
      throw new AuthenticationError("Unauthorised to perform this operation");
    }
    const doc = await Coupon.findByIdAndDelete(CouponId);
    await StoreOwner.findByIdAndUpdate(user.id, {
      $pull: { coupons: doc._id },
    });
    return doc;
  } catch (error) {
    console.log(`[ERROR]: Failed to delete Coupon | ${error.message}`);
    throw new ApolloError("Failed to delete Coupon ");
  }
};

module.exports = deleteCoupons;
