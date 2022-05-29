const generateRandomNumber = () =>
  Math.round(Math.random() * (2000000 - 1000000) + 10000000);

module.exports = { generateRandomNumber };
