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
    console.log("error", error);
  }

  // then((gcResponse) => {
  //   const str = JSON.stringify(gcResponse.data.results[0]);
  //   console.log(gcResponse.data.results[0]);
  //   console.log(`First result is: ${str}`);
  // });
};

module.exports = getGeoLocation;

//   .elevation({
//     params: {
//       locations: [{ lat: 45, lng: -110 }],
//       key: process.env.GOOGLE_MAPS_API_KEY,
//     },
//     timeout: 1000, // milliseconds
//   })
//   .then((r) => {
//     console.log(r.data.results[0].elevation);
//   })
//   .catch((e) => {
//     console.log(e.response.data.error_message);
//   });
