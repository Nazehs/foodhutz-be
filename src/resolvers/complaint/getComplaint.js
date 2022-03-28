const { ApolloError, AuthenticationError } = require("apollo-server-express");

const { Complaint } = require("../../models");

const getComplaint = async (_, { complaintId }, { user }) => {
  try {
    if (!user) {
      throw new AuthenticationError("Unauthorised to perform this operation");
    }
    console.log(await Complaint.findById(complaintId));
    return await Complaint.findById(complaintId)
      .populate("user")
      .populate("order");
  } catch (error) {
    console.log(`[ERROR]: Failed to get Complaint details| ${error.message}`);
    throw new ApolloError("Failed to get Complaint details");
  }
};

module.exports = getComplaint;
