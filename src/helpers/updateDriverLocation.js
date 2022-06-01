const { Driver } = require("../models");

const updateDriverLocation = (driverId, location) => {
  return new Promise((resolve, reject) => {
    Driver.findByIdAndUpdate(
      driverId,
      { location },
      { new: true },
      (err, driver) => {
        if (err) {
          reject(err);
        }
        resolve(driver);
      }
    ).catch((err) => {
      reject(err);
    });
  });
};

module.exports = updateDriverLocation;
