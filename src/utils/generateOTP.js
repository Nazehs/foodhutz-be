const generateOTP = () =>
  Math.round(Math.random() * (200000 - 100000) + 1000000);

module.exports = generateOTP;


