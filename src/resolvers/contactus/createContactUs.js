const { ApolloError, AuthenticationError } = require("apollo-server-express");
const { ContactUs } = require("../../models");

const createContactUs = async (_, { input }, { user }) => {
  try {
    if (!user) {
      throw new AuthenticationError("Unauthorised to perform this operation");
    }
    const doc = await ContactUs.create(input);

    return await ContactUs.findById(doc._id).populate("user");
    // .populate({
    //   path: "user",
    //   populate: {
    //     path: "orders",
    //     model: "Order",
    //   },
    // });
    // return await ContactUs.create(input);
  } catch (error) {
    console.log(`[ERROR]: Failed to create a menu | ${error.message}`);
    throw new ApolloError("Failed to create a menu");
  }
};

module.exports = createContactUs;
