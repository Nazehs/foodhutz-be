const { ApolloError, AuthenticationError } = require("apollo-server-express");
const {
  confirmPaymentIntent,
  createPaymentMethod,
  confirmCardPayment,
} = require("./stripePaymentHelpers");

const confirmUserPayment = async (_, { input }, { user }) => {
  try {
    if (!user) {
      throw new AuthenticationError("Unauthorised to perform this operation");
    }

    // const { amount, currency, description, email, receipt_email } = input;

    const payment = {
      type: "card",
      card: {
        number: "4242424242424242",
        exp_month: 1,
        exp_year: 2024,
        cvc: "314",
      },
    };

    // get the order charges
    // const orderCharges = await Order.find({ order: input.orderId });

    // create customer

    // user.description = "new order of customer id";

    // create the customer for one time payment
    // const customer = await createCustomer(user);

    // create payment method
    // const paymentMethod = await createPaymentMethod(payment);

    // console.log(paymentMethod);

    // attached the payment method to the customer
    // await attachPaymentMethodToCustomer({
    //   paymentMethodId: paymentMethod.id,
    //   customerId: customer.id,
    // });

    // const paymentIntentParams = {
    //   // amount: orderCharges.finalPrice * 100,
    //   amount: 100 * 100,
    //   currency: "gbp",
    //   payment_method: paymentMethod.id,
    //   confirm: true,
    //   metadata: user,
    //   // name: `${user.firstName} ${user.lastName}`,
    //   receipt_email: "nazehabel@gmail.com" || user.email,
    //   customer: customer.id,
    // };

    // Create a PaymentIntent with the order amount and currency
    // const paymentIntent = await createPaymentIntent(paymentIntentParams);

    const confirmPayment = await confirmCardPayment(input);
    console.log(confirmPayment);

    return confirmPayment;
  } catch (error) {
    console.log(`[ERROR]: Failed to create payment intent | ${error.message}`);
    throw new ApolloError(
      `Failed to create payment intent || ${error.message}`
    );
  }
};
module.exports = confirmUserPayment;
