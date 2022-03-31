const { ApolloError, AuthenticationError } = require("apollo-server-express");

const { ReferAndEarn } = require("../../models");

const getAllReferAndEarn = async (_, { limit = 10, skip = 0 }, { user }) => {
  try {
    if (!user) {
      throw new AuthenticationError("Unauthorised to perform this operation");
    }

    if (limit == 0) {
      throw new ApolloError("Provide a valid limit");
    }
    const ferralsCount = await ReferAndEarn.count();
    const docs = await ReferAndEarn.find({})
      .skip(skip)
      .limit(limit)
      .populate("user");
    const totalPages = Math.ceil(ferralsCount / limit);
    const currentPage = Math.ceil(ferralsCount % (skip + 1));

    return {
      status: 0,
      ReferAndEarnCodes: docs,
      success: true,
      currentPage: currentPage == 0 ? currentPage + 1 : currentPage,
      totalPages,
      hasMore: ferralsCount >= limit + 1,
    };
  } catch (error) {
    console.log(`[ERROR]: Failed to get meal details | ${error.message}`);
    throw new ApolloError("Failed to get meal details");
  }
};

module.exports = getAllReferAndEarn;
