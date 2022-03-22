const { ApolloError, AuthenticationError } = require("apollo-server-express");

const { Complaint } = require("../../models");

const deleteComplaint = async (_, { complaintId }, { user }) => {
  try {
    if (!user) {
      throw new AuthenticationError("Unauthorised to perform this operation");
    }

    return await Complaint.findByIdAndDelete(complaintId);
  } catch (error) {
    console.log(`[ERROR]: Failed to delete menu  details | ${error.message}`);
    throw new ApolloError("Failed to delete menu details");
  }
};

module.exports = deleteComplaint;
