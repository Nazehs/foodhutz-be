const updateRestaurantWallet = require("./restaurant/updateRestaurantWallet");
const updateDriverWallet = require("./driver/updateDriverWallet");
const payoutUser = async (user, amount) => {
  try {
    const payout = await stripe.payouts.create(
      {
        amount: amount,
        currency: "GBP",
        statement_descriptor: process.env.STRIPE_PAYOUT_DESCRIPTOR,
      },
      { stripe_account: user?.stripeAccountId }
    );
    console.log("Payout created:", payout);

    if (user.userType.toLowerCase() === "restaurant") {
      await updateRestaurantWallet(user.id, payout.amount);
    }
    if (user.userType.toLowerCase() === "driver") {
      await updateDriverWallet(user.id, payout.amount);
    }
  } catch (err) {
    console.log(`[ERROR - payout]: Failed to create a Stripe payout: ${err}`);
    console.log(err);
  }
};

module.exports = payoutUser;
