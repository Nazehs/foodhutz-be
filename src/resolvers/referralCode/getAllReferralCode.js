const { ApolloError, AuthenticationError } = require("apollo-server-express");

const { ReferralCode } = require("../../models");

const getAllReferralCode = async (_, { limit = 10, skip = 0 }, { user }) => {
  try {
    if (!user) {
      throw new AuthenticationError("Unauthorised to perform this operation");
    }

    const docs = await ReferralCode.find({})
      .skip(skip)
      .limit(limit)
      .populate("owner");
    const docsCount = await ReferralCode.count();
    const totalPages = Math.ceil(docsCount / limit);
    const currentPage = Math.ceil(docsCount % (skip + 1));

    return {
      status: 0,
      referralCodes: docs,
      success: true,
      currentPage: currentPage == 0 ? currentPage + 1 : currentPage,
      totalPages,
      hasMore: docsCount >= limit + 1,
    };
  } catch (error) {
    console.log(
      `[ERROR]: Failed to get referral code details | ${error.message}`
    );
    throw new ApolloError("Failed to get referral code details");
  }
};

module.exports = getAllReferralCode;
