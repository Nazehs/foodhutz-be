

// Set your secret key. Remember to switch to your live secret key in production.
// See your keys here: https://dashboard.stripe.com/apikeys
const stripe = require("stripe")("sk_test_jy4RDZiCWtIGt3Hz9JNOsd85");

const account = await stripe.accounts.create({
  country: "US",
  type: "express",
  capabilities: {
    card_payments: { requested: true },
    transfers: { requested: true },
  },
  business_type: "individual",
  business_profile: { url: "https://example.com" },
});

const createCardToken = async (cardInfo) => {
  const stripe = require("stripe")("sk_test_jy4RDZiCWtIGt3Hz9JNOsd85");

  const token = await stripe.tokens.create({
    card: {
      number: "4242424242424242",
      exp_month: 6,
      exp_year: 2023,
      cvc: "314",
    },
  });
};
