const { ApolloError, AuthenticationError } = require("apollo-server-express");

const { Coupon, StoreOwner } = require("../../models");

const createCoupon = async (_, { input }, { user }) => {
  try {
    if (!user) {
      throw new AuthenticationError("Unauthorised to perform this operation");
    }
    const doc = await Coupon.create(input);
    await StoreOwner.findByIdAndUpdate(user.id, {
      $push: { coupon: doc._id },
    });
    return doc;
  } catch (error) {
    console.log(`[ERROR]: Failed to create coupon | ${error.message}`);
    throw new ApolloError("Failed to create coupon ");
  }
};

module.exports = createCoupon;
