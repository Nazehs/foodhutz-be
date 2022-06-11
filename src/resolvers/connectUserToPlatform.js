const connectUserToPlatform = async (__, { input }, req) => {
  try {
    // Check the `state` we got back equals the one we generated before proceeding (to protect from CSRF)
    if (req.session.state != req.query.state) {
      throw new AppolloAuthenticationError(
        "You are not authorized to access this resource."
      );
    }
    try {
      // Post the authorization code to Stripe to complete the Express onboarding flow
      const expressAuthorized = await req.post({
        uri: process.env.STRIPE_AUTHORIZATION_URL,
        form: {
          grant_type: "authorization_code",
          client_id: process.env.STRIPE_CLIENT_ID,
          client_secret: process.env.STRIPE_SECRET_KEY,
          code: input.code || req.query.code,
        },
        json: true,
      });

      console.log("expressAuthorized", expressAuthorized);

      if (expressAuthorized.error) {
        throw new AppolloError(
          `failed to connect to Stripe platform account for user  ${user.id}`
        );
      }

      // Update the model and store the Stripe account ID in the datastore:
      // this Stripe account ID will be used to issue payouts to the pilot
      req.user.stripeAccountId = expressAuthorized.stripe_user_id;
      // await req.user.save();

      console.log(
        `[INFO]: User ${req.user.id} connected to Stripe platform account`
      );
      return {
        success: true,
        status: 0,
        expressAuthorized,
        message: "User connected to Stripe platform account",
      };
    } catch (err) {
      console.log("The Stripe onboarding process has not succeeded.");
      next(err);
    }
  } catch (error) {
    console.log(
      `[ERROR]: Failed to connect user to platform-failed to onboard customer | ${error.message}`
    );
  }
};

module.exports = connectUserToPlatform;
