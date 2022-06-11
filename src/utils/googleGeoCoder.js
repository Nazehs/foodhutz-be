const { Client } = require("@googlemaps/google-maps-services-js");

const client = new Client({});

const getGeoLocation = async (address) => {
  try {
    const args = {
      params: {
        key: process.env.GOOGLE_MAPS_API_KEY,
        address,
      },
      timeout: 1000, // milliseconds
    };
    console.log(address);
    return await client.geocode(args);
  } catch (error) {
    console.log(
      `[ERROR - getGeoLocation]: Failed to get map details | ${error.message}`
    );
  }
};

module.exports = getGeoLocation;
