const { ApolloError, AuthenticationError } = require("apollo-server-express");

const { Complaint } = require("../../models");

const updateComplaint = async (_, { complaintId, input }, { user }) => {
  try {
    if (!user) {
      throw new AuthenticationError("Unauthorised to perform this operation");
    }

    return await Complaint.findByIdAndUpdate(complaintId, input, {
      new: true,
    }).populate("category");
  } catch (error) {
    console.log(`[ERROR]: Failed toupdate menu  details | ${error.message}`);
    throw new ApolloError("Failed to update menu details");
  }
};

module.exports = updateComplaint;
