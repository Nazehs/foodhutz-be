const { AuthenticationError, ApolloError } = require("apollo-server-express");
// throw new UserInputError('Invalid argument value')

const { User } = require("../../models");
const { signToken } = require("../../utils/auth");

const login = async (_, { input }) => {
  try {
    let user;
    if (input.email) {
      user = await User.findOne({ email: input.email });
    }

    if (input.phoneNumber) {
      user = await User.findOne({ phoneNumber: input.phoneNumber });
    }

    if (!user) {
      console.log("[ERROR - login]: Failed to login | User does not exist");
      throw new ApolloError("Oops! user does not exist", "FORBIDDEN");
      // throw new ApolloError({
      //   message: "Oops! user does not exist",
      //   code: 404,
      // });
      // throw new Appolo("Invalid argument value", {
      //   argumentName: "email",
      // });
    }
    const isValidPassword = await user.checkPassword(input.password);

    if (!isValidPassword) {
      console.log("[ERROR - login]: Failed to login | Incorrect password");

      throw new AuthenticationError("Oops! wrong credentials");
    }

    console.log("[INFO - login]: Successfully logged in");
    return {
      token: signToken(user),
      user,
    };
  } catch (error) {
    console.log(`[ERROR]: Failed to login | `);

    throw new ApolloError(`${error.message}`);
  }
};

module.exports = login;
