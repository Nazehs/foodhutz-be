const { ApolloError, AuthenticationError } = require("apollo-server-express");

const { Complaint } = require("../../models");

const getAllComplaint = async (_, __, { user }) => {
  try {
    if (!user) {
      throw new AuthenticationError("Unauthorised to perform this operation");
    }

    return {
      status: 0,
      menus: await Complaint.find({}),
      messages: "success",
    };
  } catch (error) {
    console.log(`[ERROR]: Failed to get all complaints | ${error.message}`);
    throw new ApolloError("Failed to get all complaints");
  }
};

module.exports = getAllComplaint;
