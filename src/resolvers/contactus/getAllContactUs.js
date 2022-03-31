const { ApolloError, AuthenticationError } = require("apollo-server-express");

const { ContactUs } = require("../../models");

const getAllContactUs = async (_, { limit = 10, skip = 0 }, { user }) => {
  try {
    if (!user) {
      throw new AuthenticationError("Unauthorised to perform this operation");
    }
    const docs = await ContactUs.find({})
      .populate("user")
      .skip(skip)
      .limit(limit);
    const docsCount = await ContactUs.count();
    const totalPages = Math.ceil(docsCount / limit);
    const currentPage = Math.ceil(docsCount % (skip + 1));
    return {
      status: 0,
      messages: docs,
      success: true,
      currentPage: currentPage == 0 ? currentPage + 1 : currentPage,
      totalPages,
      hasMore: docsCount >= limit + 1,
    };
  } catch (error) {
    console.log(`[ERROR]: Failed to get contact us details | ${error.message}`);
    throw new ApolloError("Failed to get contact us details");
  }
};

module.exports = getAllContactUs;
