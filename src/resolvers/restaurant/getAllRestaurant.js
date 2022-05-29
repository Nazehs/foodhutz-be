const { ApolloError, AuthenticationError } = require("apollo-server-express");

const { StoreOwner } = require("../../models");

const getAllStoreOwner = async (
  _,
  { limit = 12, skip = 0, postCode },
  { user }
) => {
  try {
    if (!user) {
      throw new AuthenticationError("Unauthorised to perform this operation");
    }
    let docs;
    if (postCode) {
      // get the postcode details from google maps
      const {
        data: { results: userLocation },
      } = await getGeoLocation(postCode);

      // get the long and lat from the postcode
      const location = {
        type: "Point",
        coordinates: [
          userLocation[0]?.geometry?.location?.lng,
          userLocation[0]?.geometry?.location?.lat,
        ],
      };
      // go to the database and find me the restaurants close to the user
      docs = await StoreOwner.find({
        location: {
          $near: {
            $geometry: location,
            //(8046.72 metres = 5miles) - the below is just approximated values to get rid of floats
            $maxDistance: 8050,
            // distanceField: "calcDistance",
          },
        },
      })
        .populate("categories")
        .populate("orders")
        .populate("bankDetails")
        .populate("menus")
        .populate("coupons");

      // this.storeAddress = results[0].formatted_address;
    } else {
      docs = await StoreOwner.find()
        .populate("categories")
        .populate("orders")
        .populate("bankDetails")
        .populate("menus")
        .populate("coupons");
    }

    const docsCount = await StoreOwner.count();
    const totalPages = Math.ceil(docsCount / limit);
    const currentPage = Math.ceil(docsCount % (skip + 1));
    return {
      status: 0,
      success: true,
      users: docs,
      currentPage: currentPage == 0 ? currentPage + 1 : currentPage,
      totalPages,
      hasMore: docsCount >= limit + 1,
    };
  } catch (error) {
    console.log(`[ERROR]: Failed to get all StoreOwner | ${error.message}`);
    throw new ApolloError(`Failed to get all StoreOwner  || ${error.message}`);
  }
};

module.exports = getAllStoreOwner;
