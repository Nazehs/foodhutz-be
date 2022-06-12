const { AuthenticationError } = require("apollo-server-express");

const { Driver } = require("../../models");
const { signToken } = require("../../utils/auth");

const driverLogin = async (_, { input }) => {
  try {
    let user;
    if (input.email) {
      user = await Driver.findOne({ email: input.email })
        .populate("documents")
        .populate("trips")
        .populate("trips")
        .populate({
          path: "trips",
          populate: {
            path: "order",
            model: "Order",
          },
        })
        .populate({
          path: "trips",
          populate: {
            path: "order",
            populate: {
              path: "deliveryBy",
              model: "Driver",
            },
          },
        })
        .populate({
          path: "trips",
          populate: {
            path: "order",
            populate: {
              path: "orderItems",
              populate: {
                path: "restaurant",
                model: "StoreOwner",
              },
            },
          },
        })
        .populate({
          path: "trips",
          populate: {
            path: "order",
            populate: {
              path: "orderItems",
              populate: {
                path: "category",
                model: "Category",
              },
            },
          },
        })
        .populate("notifications")
        .populate({
          path: "notifications",
          populate: {
            path: "order",
            model: "Order",
          },
        })
        .populate({
          path: "notifications",
          populate: {
            path: "user",
            model: "User",
          },
        })
        .populate({
          path: "notifications",
          populate: {
            path: "order",
            populate: {
              path: "orderItems",
              populate: {
                path: "restaurant",
                model: "StoreOwner",
              },
            },
          },
        })
        .populate({
          path: "notifications",
          populate: {
            path: "order",
            populate: {
              path: "orderItems",
              populate: {
                path: "category",
                model: "Category",
              },
            },
          },
        })
        .populate({
          path: "notifications",
          populate: {
            path: "order",
            populate: {
              path: "orderItems",
              populate: {
                path: "customer",
                model: "User",
              },
            },
          },
        })
        .populate({
          path: "trips",
          populate: {
            path: "order",
            populate: {
              path: "orderItems",
              populate: {
                path: "customer",
                model: "User",
              },
            },
          },
        })
        .populate("bankDetails")
        .populate({
          path: "invoices",
          populate: {
            path: "bankDetails",
            model: "BankDetail",
          },
        });
    }

    if (input.phoneNumber) {
      user = await Driver.findOne({ phoneNumber: input.phoneNumber })
        .populate("documents")
        .populate("trips")
        .populate("trips")
        .populate({
          path: "trips",
          populate: {
            path: "order",
            model: "Order",
          },
        })
        .populate({
          path: "trips",
          populate: {
            path: "order",
            populate: {
              path: "deliveryBy",
              model: "Driver",
            },
          },
        })
        .populate({
          path: "trips",
          populate: {
            path: "order",
            populate: {
              path: "orderItems",
              populate: {
                path: "restaurant",
                model: "StoreOwner",
              },
            },
          },
        })
        .populate({
          path: "trips",
          populate: {
            path: "order",
            populate: {
              path: "orderItems",
              populate: {
                path: "category",
                model: "Category",
              },
            },
          },
        })
        .populate("notifications")
        .populate({
          path: "notifications",
          populate: {
            path: "order",
            model: "Order",
          },
        })
        .populate({
          path: "notifications",
          populate: {
            path: "order",
            populate: {
              path: "orderItems",
              populate: {
                path: "category",
                model: "Category",
              },
            },
          },
        })
        .populate({
          path: "notifications",
          populate: {
            path: "order",
            populate: {
              path: "orderItems",
              populate: {
                path: "customer",
                model: "Category",
              },
            },
          },
        })
        .populate({
          path: "notifications",
          populate: {
            path: "user",
            model: "User",
          },
        })
        .populate({
          path: "notifications",
          populate: {
            path: "order",
            populate: {
              path: "orderItems",
              populate: {
                path: "restaurant",
                model: "StoreOwner",
              },
            },
          },
        })
        .populate({
          path: "notifications",
          populate: {
            path: "order",
            populate: {
              path: "orderItems",
              populate: {
                path: "customer",
                model: "User",
              },
            },
          },
        })
        .populate("bankDetails")
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
        "[ERROR - driverLogin]: Failed to login | User does not exist"
      );
      throw new AuthenticationError("Failed to login");
    }
    const isValidPassword = await user.checkPassword(input.password);

    if (!isValidPassword) {
      console.log(
        "[ERROR - driverLogin]: Failed to login | Incorrect password"
      );
      throw new AuthenticationError("Failed to login");
    }
    console.log("[INFO]: Successfully logged in");
    return {
      token: signToken(user),
      user,
    };
  } catch (error) {
    console.log(`[ERROR - driverLogin]: Failed to login | ${error.message}`);
    throw new AuthenticationError(`Failed to login || ${error.message}`);
  }
};

module.exports = driverLogin;
