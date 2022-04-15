const { Client } = require("@googlemaps/google-maps-services-js");

const client = new Client({});

const getTripMatrix = async (from, To) => {
  try {
    const args = {
      params: {
        key: process.env.GOOGLE_MAPS_API_KEY,
        destinations: [{ latitude: 52.5725, longitude: -2.1429 }],
        origins: [{ longitude: -2.1256, latitude: 52.5878 }],
        mode: "driving",
        region: "gb",
        departure_time: Date.now(),
      },
      timeout: 1000, // milliseconds
    };
    return await client.distancematrix(args);
  } catch (error) {
    console.log("error", error);
  }
};

module.exports = getTripMatrix;
