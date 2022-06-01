const { FARE_CHARGES_PER_MILE_TO_USER, FARE_CHARGES_PER_MILE_RESTAURANT } =
  process.env;
const MILES_TO_KM = 1609.34;

const calculateFareToRestaurant = (distance) => {
  // convert the distance to miles
  const distanceInMiles = distance / MILES_TO_KM;
  console.log(distanceInMiles);
  const fare = distanceInMiles * FARE_CHARGES_PER_MILE_RESTAURANT;
  if (distanceInMiles <= 2) {
    return fare;
  } else if (distanceInMiles > 2) {
    return fare + 0.5 * (distanceInMiles - 2);
  }
  return fare;
};

const calculateFareToUser = (distance) => {
  // convert the distance to miles
  const distanceInMiles = distance / MILES_TO_KM;
  const fare = distanceInMiles * FARE_CHARGES_PER_MILE_TO_USER;
  if (distanceInMiles <= 2) {
    return fare;
  } else if (distanceInMiles > 2) {
    return fare + 0.5 * (distanceInMiles - 2);
  }
  return fare;
};

module.exports = { calculateFareToRestaurant, calculateFareToUser };
