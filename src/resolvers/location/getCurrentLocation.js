const { ApolloError, AuthenticationError } = require("apollo-server-express");

const { Order } = require("../../models");
const getTripDirection = require("../../utils/getTravelDirection");
const getTripMatrix = require("../../utils/getTripMatrix");
const getGeoLocation = require("../../utils/googleGeoCoder");

const getCurrentLocation = async (_, { input }, { user }) => {
  try {
    console.log(input);
    // if (!user) {
    //   throw new AuthenticationError("Unauthorised to perform this operation");
    // }
    // return await Order.findById(orderId);
    // const loc = await getGeoLocation(input);
    // console.log(loc.data.results[0]);
    const {
      data: { rows },
    } = await getTripMatrix("Lyndhurst Road, Wolverhampton");
    console.log(rows[0].elements);
    const { data } = await getTripDirection(input);
    console.log(data);
    // const location = {
    //   type: "Point",
    //   coordinates: [
    //     results[0].geometry.location.lng,
    //     results[0].geometry.location.lat,
    //   ],
    //   formattedAddress: results[0].formatted_address,
    //   postCode:
    //     results[0].address_components[results[0].address_components.length - 1]
    //       .short_name,
    //   city: results[0].address_components[2].long_name,
    // };
    // console.log(location);
  } catch (error) {
    console.log(`[ERROR]: Failed to get order details| ${error.message}`);
    throw new ApolloError("Failed to get order details");
  }
};

module.exports = getCurrentLocation;
