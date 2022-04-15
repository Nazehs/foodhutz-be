const { Client } = require("@googlemaps/google-maps-services-js");

const client = new Client({});

const getTripDirection = async (from, To) => {
  try {
    const args = {
      params: {
        key: process.env.GOOGLE_MAPS_API_KEY,
        alternatives: true,
        // destinations: [{ latitude: 52.5725, longitude: -2.1429 }],
        // origins: [{ longitude: -2.1256, latitude: 52.5878 }]
        destination: [52.5725, -2.1429],
        origin: [52.5878, -2.1256],
      },
      timeout: 1000, // milliseconds
    };
    return await client.directions(args);
  } catch (error) {
    console.log("error", error);
  }
};

module.exports = getTripDirection;
