const { ApolloError, AuthenticationError } = require("apollo-server-express");

const { Complaint } = require("../../models");

const getAllComplaint = async (_, __, { user }) => {
  try {
    if (!user) {
      throw new AuthenticationError("Unauthorised to perform this operation");
    }

    return {
      status: 0,
      complaints: await Complaint.find({})
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
        .populate("user"),
      success: true,
    };
  } catch (error) {
    console.log(`[ERROR]: Failed to get all complaints | ${error.message}`);
    throw new ApolloError("Failed to get all complaints");
  }
};

module.exports = getAllComplaint;
