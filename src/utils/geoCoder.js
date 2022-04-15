const NodeGeocoder = require("node-geocoder");

const options = {
  provider: process.env.GEOCODER_PROVIDER,
  httpAdapter: "https",
  // Optional depending on the providers
  //   fetch: customFetchImplementation,
  apiKey: process.env.MAP_QUEST_CONSUMER_KEY, // for Mapquest, OpenCage, Google Premier
  formatter: null, // 'gpx', 'string', ...
};

const geocoder = NodeGeocoder(options);

module.exports = geocoder;

// Using callback
// const res = await geocoder.geocode("29 champs elysée paris");
