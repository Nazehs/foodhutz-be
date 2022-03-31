const { ApolloError, AuthenticationError } = require("apollo-server-express");

const { Complaint } = require("../../models");

const getAllComplaint = async (_, { limit=10, skip=0 }, { user }) => {
  try {
    if (!user) {
      throw new AuthenticationError("Unauthorised to perform this operation");
    }

    if (limit == 0) {
      throw new ApolloError("Provide a valid limit");
    }
    const complaintsCount = await Complaint.count();

    const docs = await Complaint.find({})
      .skip(skip)
      .limit(limit)
      .populate({
        path: "order",
        populate: {
          path: "restaurant",
          model: "Restaurant",
        },
      })
      .populate({
        path: "order",
        populate: {
          path: "category",
          model: "Category",
        },
      })
      .populate("order")
      .populate("user");

    const totalPages = Math.ceil(complaintsCount / limit);
    const currentPage = Math.ceil(complaintsCount % (skip + 1));

    return {
      status: 0,
      complaints: docs,
      success: true,
      status: 0,
      currentPage: currentPage == 0 ? currentPage + 1 : currentPage,
      totalPages,
      hasMore: complaintsCount >= limit + 1,
    };
  } catch (error) {
    console.log(`[ERROR]: Failed to get all complaints | ${error.message}`);
    throw new ApolloError("Failed to get all complaints");
  }
};

module.exports = getAllComplaint;
