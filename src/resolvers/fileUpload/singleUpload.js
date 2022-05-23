const { Document, StoreOwner, User, Driver } = require("../../models");
const { ApolloError, AuthenticationError } = require("apollo-server-express");
const uploadFromStream = require("../../utils/uploadHelper");

const singleUpload = async (_, { input }, { user }) => {
  try {
    if (!user) {
      throw new AuthenticationError("Unauthorised to perform this operation");
    }
    const result = await uploadFromStream(input);
    console.log("upload result ", result);
    const doc = await Document.create({
      name: input.documentType,
      imageUrl: result.secure_url,
    });
    console.log("doc uploaded  ", doc);
    if (user.userType === "USER") {
      await User.findByIdAndUpdate(user.id, {
        $push: { documents: doc._id },
      });
    }
    if (user.userType === "RESTAURANT") {
      await StoreOwner.findByIdAndUpdate(user.id, {
        $push: { documents: doc._id },
      });
    }
    if (user.userType === "DRIVER") {
      await Driver.findByIdAndUpdate(user.id, {
        $push: { documents: doc._id },
      });
    }

    return doc;
  } catch (error) {
    console.log(error);
    throw new ApolloError("Failed to upload document");
  }
};

module.exports = singleUpload;
