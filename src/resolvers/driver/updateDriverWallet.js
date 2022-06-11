const { Driver } = require("../../models");

// update restaurant sales
const updateDriverWallet = (restaurantId, amount) => {
  return new Promise((resolve, reject) => {
    //   increment the sales amount of the restaurant
    const query = Driver.findAndUpdateById(restaurantId, {
      wallet: { $add: amount },
    });
    query
      .exec((err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
};

module.exports = updateDriverWallet;
