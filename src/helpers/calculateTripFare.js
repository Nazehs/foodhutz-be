const { FARE_CHARGES_PER_MILE_TO_USER, FARE_CHARGES_PER_MILE_RESTAURANT } =
  process.env;

const METRES_TO_MILES = 1609.34;
const RATE_OVER_DISTANCE = 0.5;

const calculateFareToRestaurant = (distance) => {
  // convert the distance to miles
  const distanceInMiles = distance / METRES_TO_MILES;
  const fare = distanceInMiles * FARE_CHARGES_PER_MILE_RESTAURANT;
  if (distanceInMiles <= 2) {
    return fare;
  } else if (distanceInMiles > 2) {
    return fare + RATE_OVER_DISTANCE * (distanceInMiles - 2);
  }
  return fare;
};

const calculateFareToUser = (distance) => {
  // convert the distance to miles
  const distanceInMiles = distance / METRES_TO_MILES;
  const fare = distanceInMiles * FARE_CHARGES_PER_MILE_TO_USER;
  if (distanceInMiles <= 2) {
    return fare;
  } else if (distanceInMiles > 2) {
    return fare + RATE_OVER_DISTANCE * (distanceInMiles - 2);
  }
  return fare;
};

module.exports = { calculateFareToRestaurant, calculateFareToUser };
