const { ApolloError } = require("apollo-server-express");
const { Complaint } = require("../../models");

const createComplaint = async (_, { input }, { user }) => {
  try {
    return await Complaint.create(input);
  } catch (error) {
    console.log(`[ERROR]: Failed to create a menu | ${error.message}`);
    throw new ApolloError("Failed to create a menu");
  }
};

module.exports = createComplaint;
