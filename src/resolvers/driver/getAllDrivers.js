const { ApolloError, AuthenticationError } = require("apollo-server-express");

const { Driver } = require("../../models");

const getAllDrivers = async (_, { limit = 10, skip = 0 }, { user }) => {
  try {
    if (!user) {
      throw new AuthenticationError("Unauthorised to perform this operation");
    }
    if (limit == 0) {
      throw new ApolloError("Provide a valid limit");
    }

    const docs = await Driver.find().skip(skip).limit(limit);
    const usersCount = await Driver.count();
    const totalPages = Math.ceil(usersCount / limit);
    const currentPage = Math.ceil(usersCount % (skip + 1));

    return {
      drivers: docs,
      status: 0,
      message: "success",
      success: true,
      currentPage: currentPage == 0 ? currentPage + 1 : currentPage,
      totalPages,
      hasMore: usersCount >= limit + 1,
    };
  } catch (error) {
    console.log(`[ERROR]: Failed to get all  user  | ${error.message}`);
    throw new ApolloError("Failed to get users");
  }
};

module.exports = getAllDrivers;