const { Client } = require("@googlemaps/google-maps-services-js");

const client = new Client({});

const getTripMatrix = async (from, to) => {
  try {
    const args = {
      params: {
        key: process.env.GOOGLE_MAPS_API_KEY,
        destinations: to,
        origins: from,
        units: "imperial",
        mode: "driving",
        region: "gb",
        departure_time: Date.now(),
      },
      timeout: 1000, // milliseconds
    };
    return await client.distancematrix(args);
  } catch (error) {
    console.log(
      `[ERROR - getTripMatrix]: Failed to get map details | ${error.message}`
    );
    throw new Error(`Failed to get map details || ${error.message}`);
  }
};

module.exports = getTripMatrix;
