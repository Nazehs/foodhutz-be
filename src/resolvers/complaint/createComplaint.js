const { ApolloError } = require("apollo-server-express");
const { Complaint } = require("../../models");

const createComplaint = async (_, { input }, { user }) => {
  try {
    if (!user) {
      throw new AuthenticationError("Unauthorised to perform this operation");
    }
    const doc = await Complaint.create(input);
    return await Complaint.findById(doc.id)
      .populate("user")
      .populate("order")
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
      });
  } catch (error) {
    console.log(`[ERROR]: Failed to create a menu | ${error.message}`);
    throw new ApolloError("Failed to create a menu");
  }
};

module.exports = createComplaint;
