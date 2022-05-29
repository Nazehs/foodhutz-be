const { FARE_CHARGES_PER_MILE } = process.env;
// Okay distance for driver to pick up food between 1-2miles = 1.30 and the delivery to
// customers 1-2miles =1.50 but at every 0.5 miles added to the
// initial default distance will cost 50p
const calculateTripFare = (distance) => {
  return distance * FARE_CHARGES_PER_MILE;
};

module.exports = calculateTripFare;
