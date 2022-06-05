const stripe = require("stripe")("sk_test_jy4RDZiCWtIGt3Hz9JNOsd85", {
  maxNetworkRetries: 2,
});

// create payment intent
// confirm payment on the client(use the  available cards if any or the new card)

// const stripe = new Stripe("sk_test_jy4RDZiCWtIGt3Hz9JNOsd85", {
//   apiVersion: "2020-08-27",
// });
const uuid = require("uuid");
const createCustomer = async (customer) => {
  // console.log(customer);
  try {
    // Create a new customer and then create an invoice item then invoice it:
    return await stripe.customers.create({
      email: customer.email,
      description: customer.description,
      name: `${customer.firstName} ${customer.lastName}`,
      phone: customer.phone,
      preferred_locales: ["en"],
      metadata: customer,
    });
  } catch (error) {
    console.log("error  ", error);
  }
};

const createCheckoutSession = async () => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      success_url: "https://example.com/success",
      cancel_url: "https://example.com/cancel",
    });
    console.log(session);
  } catch (error) {
    console.log(error);
  }
};
const retrieveCheckoutSession = async () => {
  try {
    const session = await stripe.checkout.sessions.retrieve(
      "cs_FgQ2fRJz6e8qxD",
      {
        expand: [
          "setup_intent",
          "payment_intent",
          "customer",
          "payment_intent.payment_method",
        ],
      }
    );
    console.log(session);
  } catch (error) {
    console.log(error);
  }
};

const createCharge = async () => {
  try {
    const params = {
      amount: 2000,
      currency: "GBP",
      description: "test charge",
      customer: "cus_FgQ2fRJz6e8qxD",
    };

    const charge = await stripe.charges
      .create(params)
      .then((charge) => {
        console.log(charge);
      })
      .catch((err) => {
        console.log(err);
      });

    console.log(charge);
  } catch (error) {
    console.log(error);
  }
};
const retrieveCharges = async () => {
  try {
    const charges = await stripe.charges.list({ limit: 3 });
    console.log(charges);
  } catch (error) {
    console.log(error);
  }
};

const retrieveSingleCharge = async () => {
  try {
    const charge = await stripe.charges.retrieve("ch_1FgQ2fRJz6e8qxD");
    console.log(charge);
  } catch (error) {
    console.log(error);
  }
};

const updateCharge = async () => {
  try {
    const charge = await stripe.charges.update("ch_1FgQ2fRJz6e8qxD", {
      description: "test charge",
    });
    console.log(charge);
  } catch (error) {
    console.log(error);
  }
};

const getAllCharges = async () => {
  try {
    const charges = await stripe.charges.list({ limit: 3 });
    console.log(charges);
  } catch (error) {
    console.log(error);
  }
};

const retrieveCustomer = async () => {
  try {
    const customer = await stripe.customers.retrieve("cus_FgQ2fRJz6e8qxD");
    console.log(customer);
  } catch (error) {
    console.log(error);
  }
};

const createCustomerWithCard = async () => {
  try {
    const customer = await stripe.customers.create({
      email: "",
      description: "test customer 3",
      source: "tok_visa",
      name: "test customer 3",
      payment_method: "pm_1FgQ2fRJz6e8qxD",
      phone: "",
    });
  } catch (error) {
    console.log(error);
  }
};
const updateCustomer = async () => {
  try {
    const customer = await stripe.customers.update("cus_FgQ2fRJz6e8qxD", {
      description: "test customer 3",
      email: "",
    });
  } catch (error) {
    console.log(error);
  }
};

const deleteCustomer = async () => {
  try {
    const customer = await stripe.customers.del("cus_FgQ2fRJz6e8qxD");
  } catch (error) {
    console.log(error);
  }
};

const getAllCustomers = async () => {
  try {
    const customers = await stripe.customers.list({ limit: 3 });
    console.log(customers);
  } catch (error) {
    console.log(error);
  }
};

const searchForCustomer = async () => {
  try {
    const customer = await stripe.customers.search({
      query: "name:'fakename' AND metadata['foo']:'bar'",
    });
    console.log(customer);
  } catch (error) {
    console.log(error);
  }
};

const retrieveAnEvent = async () => {
  try {
    const event = await stripe.events.retrieve("evt_1FgQ2fRJz6e8qxD");
    console.log(event);
  } catch (error) {
    console.log(error);
  }
};

const createPaymentMethod = async (paymentData) => {
  try {
    const paymentMethod = await stripe.paymentMethods.create(paymentData);
    return paymentMethod;
  } catch (error) {
    console.log(error);
  }
};

const retrievePaymentMethod = async () => {
  try {
    const paymentMethod = await stripe.paymentMethods.retrieve(
      "pm_1FgQ2fRJz6e8qxD"
    );
    console.log(paymentMethod);
  } catch (error) {
    console.log(error);
  }
};

const getAllPaymentMethods = async () => {
  try {
    const paymentMethods = await stripe.paymentMethods.list({
      limit: 3,
      customer: "cus_LnsPdqZl62UfAW",
      type: "card",
    });
    console.log(paymentMethods);
  } catch (error) {
    console.log(error);
  }
};

const getCustomerPaymentMethods = async () => {
  try {
    const paymentMethods = await stripe.paymentMethods.list({
      limit: 3,
      customer: "cus_LnsPdqZl62UfAW",
    });
    console.log(paymentMethods);
  } catch (error) {
    console.log(error);
  }
};

const attachPaymentMethodToCustomer = async (params) => {
  try {
    return await stripe.paymentMethods.attach(params.paymentMethodId, {
      customer: params.customerId,
    });
  } catch (error) {
    console.log(error);
  }
};

const deletePaymentMethodFromCustomer = async () => {
  try {
    const paymentMethod = await stripe.paymentMethods.detach(
      "pm_1FgQ2fRJz6e8qxD",
      { customer: "cus_LnsPdqZl62UfAW" }
    );
    console.log(paymentMethod);
  } catch (error) {
    console.log(error);
  }
};

const createPayout = async () => {
  try {
    const payout = await stripe.payouts.create({
      amount: 100,
      currency: "usd",
      description: "test payout",
      destination: "acct_1FgQ2fRJz6e8qxD",
      statement_descriptor: "test payout",
      method: "instant",
    });
    console.log(payout);
  } catch (error) {
    console.log(error);
  }
};

const retrievePayout = async () => {
  try {
    const payout = await stripe.payouts.retrieve("po_1FgQ2fRJz6e8qxD");
    console.log(payout);
  } catch (error) {
    console.log(error);
  }
};

const createPaymentIntent = async (input) => {
  try {
    return await stripe.paymentIntents.create(input);
  } catch (error) {
    console.log(error);
  }
};

const confirmPaymentIntent = async (params) => {
  try {
    const paymentIntent = await stripe.paymentIntents.confirm(
      params.clientSecret,
      {
        payment_method: "pm_card_visa",
      }
    );
    return paymentIntent;
  } catch (error) {
    console.log(error);
  }
};
const confirmCardPayment = async (params) => {
  try {
    const payment = await stripe.paymentIntents.confirm(params.clientSecret, {
      payment_method: params.card,
    });
    return payment;
  } catch (error) {
    console.log(error);
  }
};
const getAllPayouts = async () => {
  try {
    const payouts = await stripe.payouts.list({ limit: 3 });
    console.log(payouts);
  } catch (error) {
    console.log(error);
  }
};

const updatePayout = async () => {
  try {
    const payout = await stripe.payouts.update("po_1FgQ2fRJz6e8qxD", {
      metadata: {
        key: "value",
      },
    });
    console.log(payout);
  } catch (error) {
    console.log(error);
  }
};

const cancelPayout = async () => {
  try {
    const payout = await stripe.payouts.cancel("po_1FgQ2fRJz6e8qxD");
    console.log(payout);
  } catch (error) {
    console.log(error);
  }
};

const reversePayout = async () => {
  try {
    const payout = await stripe.payouts.reverse("po_1FgQ2fRJz6e8qxD");
    console.log(payout);
  } catch (error) {
    console.log(error);
  }
};

const createRefund = async () => {
  try {
    const refund = await stripe.refunds.create({
      charge: "ch_1FgQ2fRJz6e8qxD",
      amount: 100,
      reason: "requested_by_customer",
    });
    console.log(refund);
  } catch (error) {
    console.log(error);
  }
};

const getAllRefunds = async () => {
  try {
    const refunds = await stripe.refunds.list({ limit: 3 });
    console.log(refunds);
  } catch (error) {
    console.log(error);
  }
};

const updateRefund = async () => {
  try {
    const refund = await stripe.refunds.update("re_1FgQ2fRJz6e8qxD", {
      metadata: {
        key: "value",
      },
    });
    console.log(refund);
  } catch (error) {
    console.log(error);
  }
};
const cancelRefunds = async () => {
  try {
    const refund = await stripe.refunds.cancel("re_1FgQ2fRJz6e8qxD");
    console.log(refund);
  } catch (error) {
    console.log(error);
  }
};

const setUpFuturePayment = async () => {
  try {
    const setupIntent = await stripe.setupIntents.create({
      payment_method_types: ["card"],
      customer: "cus_LnsPdqZl62UfAW",
    });
    console.log(setupIntent);
  } catch (error) {
    console.log(error);
  }
};
const confirmFailedPayment = async (params) => {
  try {
    const paymentIntent = await stripe.confirmCardPayment(params.clientSecret, {
      payment_method: "pm_card_visa",
    });
    return paymentIntent;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createCustomer,
  createPaymentMethod,
  createPaymentIntent,
  confirmPaymentIntent,
  confirmCardPayment,
  attachPaymentMethodToCustomer,
};
