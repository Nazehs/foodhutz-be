const generateCustomerEphemeralKey = async (__, { input }, { user }) => {
  try {
    // ephemeral keys are used for testing purposes only.
    const apiVersion = input.api_version || "2019-05-16";
    // Create ephemeral key for customer
    const ephemeralKey = await stripe.ephemeralKeys.create(
      {
        customer: user?.stripeCustomerId,
      },
      {
        stripe_version: apiVersion,
      }
    );
    console.log(`[INFO]: Ephemeral key created for passenger ${passenger._id}`);
    // Respond with ephemeral key
    return ephemeralKey;
  } catch (err) {
    console.log(`[ERROR]: Failed to create ephemeral key | ${err.message}`);
    throw new ApolloError(
      `Error creating ephemeral key: ${err.message || err}`
    );
  }
};

module.exports = generateCustomerEphemeralKey;
