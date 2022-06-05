const { AuthenticationError } = require("apollo-server-express");

const { StoreOwner } = require("../../models");
const { signToken } = require("../../utils/auth");

const storeOwnerLogin = async (_, { input }) => {
  try {
    let user;
    if (input.email) {
      user = await StoreOwner.findOne({ email: input.email })
        .populate("feedbacks")
        .populate("categories")
        .populate("orders")
        .populate("menus")
        .populate("invoices")
        .populate("coupons")
        .populate("documents")
        .populate({
          path: "orders",
          populate: {
            path: "orderItems",
            populate: {
              path: "category",
              model: "Category",
            },
          },
        })
        .populate({
          path: "menus",
          populate: {
            path: "category",
            model: "Category",
          },
        });
    }

    if (input.phoneNumber) {
      user = await StoreOwner.findOne({
        phoneNumber: input.phoneNumber,
      })
        .populate("feedbacks")
        .populate("categories")
        .populate("orders")
        .populate("menus")
        .populate("invoices")
        .populate("coupons")
        .populate("documents")
        .populate({
          path: "order",
          populate: {
            path: "orderItems",
            populate: {
              path: "category",
              model: "Category",
            },
          },
        })
        .populate({
          path: "menus",
          populate: {
            path: "category",
            model: "Category",
          },
        });
    }

    if (!user) {
      console.log("[ERROR]: Failed to login | User does not exist");
      throw new AuthenticationError("Failed to login || No such user!");
    }
    const isValidPassword = await user.checkPassword(input.password);

    if (!isValidPassword) {
      console.log("[ERROR]: Failed to login | Incorrect password");
      throw new AuthenticationError(`Failed to login || wrong credentials`);
    }

    return {
      token: signToken(user),
      user,
    };
  } catch (error) {
    console.log(`[ERROR]: Failed to login | ${error.message}`);
    throw new AuthenticationError(`Failed to login || ${error.message}`);
  }
};

module.exports = storeOwnerLogin;
