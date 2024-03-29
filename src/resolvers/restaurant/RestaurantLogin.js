const { AuthenticationError, ApolloError } = require("apollo-server-express");

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
        .populate("bankDetails")
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
        })
        .populate({
          path: "orders",
          populate: {
            path: "orderItems",
            populate: {
              path: "restaurant",
              model: "StoreOwner",
            },
          },
        })
        .populate({
          path: "invoices",
          populate: {
            path: "bankDetails",
            model: "BankDetail",
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
        .populate("bankDetails")
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
          path: "orders",
          populate: {
            path: "orderItems",
            populate: {
              path: "restaurant",
              model: "StoreOwner",
            },
          },
        })
        .populate({
          path: "menus",
          populate: {
            path: "category",
            model: "Category",
          },
        })
        .populate({
          path: "invoices",
          populate: {
            path: "bankDetails",
            model: "BankDetail",
          },
        });
    }

    if (!user) {
      console.log(
        "[ERROR - storeOwnerLogin]: Failed to login | User does not exist"
      );
      throw new AuthenticationError("Failed to login || No such user!");
    }
    const isValidPassword = await user.checkPassword(input.password);

    if (!isValidPassword) {
      console.log(
        "[ERROR - storeOwnerLogin: Failed to login | Incorrect password"
      );
      throw new AuthenticationError(`Failed to login || wrong credentials`);
    }

    return {
      token: signToken(user),
      user,
    };
  } catch (error) {
    console.log(
      `[ERROR - storeOwnerLogin]: Failed to login | ${error.message}`
    );
    if (error.message.includes("duplicate key error")) {
      throw new ApolloError(`Phone number or email already exist`);
    }
    throw new ApolloError(`Failed to login || ${error.message}`);
  }
};

module.exports = storeOwnerLogin;
