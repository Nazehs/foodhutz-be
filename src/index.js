require("dotenv").config();
require("./db/db");
const typeDefs = require("./schema");
const resolvers = require("./resolvers");
const { authMiddleware } = require("./utils/auth");
const { ApolloServer } = require("apollo-server-express");
const { ApolloServerPluginDrainHttpServer } = require("apollo-server-core");
const { graphqlUploadExpress } = require("graphql-upload");
const { makeExecutableSchema } = require("@graphql-tools/schema");
const { WebSocketServer } = require("ws");
const { useServer } = require("graphql-ws/lib/use/ws");
const express = require("express");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const http = require("http");
const updateOrderPaymentStatus = require("./helpers/updateOrderPaymentStatus");

async function startApolloServer(typeDefs, resolvers) {
  // Required logic for integrating with Express
  const app = express();

  // This is your Stripe CLI webhook secret for testing your endpoint locally.
  app.post(
    "/webhook",
    express.raw({ type: "application/json" }),
    async (request, response) => {
      const sig = request.headers["stripe-signature"];

      let event;

      try {
        event = stripe.webhooks.constructEvent(
          request.body,
          sig,
          process.env.STRIPE_WEBHOOK_SECRET
        );
        const paymentIntent = event.data.object;

        console.log(paymentIntent);

        // Handle the event
        switch (event.type) {
          case "payment_intent.succeeded":
            // update the order status to paid
            break;
          case "customer.created":
            // update the order status to paid
            break;
          case "payment_intent.created":
            console.log(event);
            await updateOrderPaymentStatus(
              paymentIntent.metadata.orderId,
              "Pending"
            );
            console.log(
              `🏵 [${event.id}] payment intent created! Payment Intent(${paymentIntent.id} : ${paymentIntent.amount} : ${paymentIntent.status})`
            );
            // update the order status to payment pending

            break;
          // ... handle other event types
          case "payment_intent.processing":
            await updateOrderPaymentStatus(
              paymentIntent.metadata.order,
              "Processing"
            );
            // update the order status to payment processing
            break;
          // ... handle other event types
          case "payment_intent.payment_failed":
            // update the database with the failed payment failed
            // update the order status to payment failed
            await updateOrderPaymentStatus(
              paymentIntent.metadata.order,
              "Failed"
            );
            break;
          // ... handle other event types
          case "payment_intent.requires_action":
            // update the database with the failed payment pending action
            await updateOrderPaymentStatus(
              paymentIntent.metadata.order,
              "Action Required"
            );
            break;
          // ... handle other event types
          case "payment_intent.canceled":
            // update the database with the failed payment canceled
            // update the order status to payment canceled
            await updateOrderPaymentStatus(
              paymentIntent.metadata.order,
              "Cancelled"
            );
            break;
          // ... handle other event types
          case "checkout.session.completed":
            // when the customer completes the checkout session on the client
            // update the database with the failed payment canceled
            await updateOrderPaymentStatus(
              paymentIntent.metadata.order,
              "Completed"
            );
            break;
          // ... handle other event types
          default:
            console.log(`Unhandled event type ${event.type}`);
            await updateOrderPaymentStatus(
              paymentIntent.metadata.order,
              "Unpaid"
            );
        }

        // Return a 200 response to acknowledge receipt of the event
        response.send({ received: true });
      } catch (err) {
        response.status(400).send(`Webhook Error: ${err.message}`);
        return;
      }
    }
  );

  function pilotRequired(req, res, next) {
    if (!req.isAuthenticated()) {
      return res.redirect("/login");
    }
    next();
  }
  // router.get("/authorize", pilotRequired, (req, res) => {
  //   // Generate a random string as `state` to protect from CSRF and include it in the session
  //   req.session.state = Math.random().toString(36).slice(2);
  //   // Define the mandatory Stripe parameters: make sure to include our platform's client ID
  //   let parameters = {
  //     client_id: config.stripe.clientId,
  //     state: req.session.state,
  //   };
  //   // Optionally, the Express onboarding flow accepts `first_name`, `last_name`, `email`,
  //   // and `phone` in the query parameters: those form fields will be prefilled
  //   parameters = Object.assign(parameters, {
  //     redirect_uri: config.publicDomain + "/pilots/stripe/token",
  //     "stripe_user[business_type]": req.user.type || "individual",
  //     "stripe_user[business_name]": req.user.businessName || undefined,
  //     "stripe_user[first_name]": req.user.firstName || undefined,
  //     "stripe_user[last_name]": req.user.lastName || undefined,
  //     "stripe_user[email]": req.user.email || undefined,
  //     "stripe_user[country]": req.user.country || undefined,
  //     // If we're suggesting this account have the `card_payments` capability,
  //     // we can pass some additional fields to prefill:
  //     // 'suggested_capabilities[]': 'card_payments',
  //     // 'stripe_user[street_address]': req.user.address || undefined,
  //     // 'stripe_user[city]': req.user.city || undefined,
  //     // 'stripe_user[zip]': req.user.postalCode || undefined,
  //     // 'stripe_user[state]': req.user.city || undefined,
  //   });
  //   console.log("Starting Express flow:", parameters);
  //   // Redirect to Stripe to start the Express onboarding flow
  //   res.redirect(
  //     config.stripe.authorizeUri + "?" + querystring.stringify(parameters)
  //   );
  // });
  // /**
  //  * GET /user/stripe/token
  //  *
  //  * Connect the new Stripe account to the platform account.
  //  */
  // router.get("/token", pilotRequired, async (req, res, next) => {
  //   // Check the `state` we got back equals the one we generated before proceeding (to protect from CSRF)
  //   if (req.session.state != req.query.state) {
  //     return res.redirect("/pilots/signup");
  //   }
  //   try {
  //     // Post the authorization code to Stripe to complete the Express onboarding flow
  //     const expressAuthorized = await request.post({
  //       uri: config.stripe.tokenUri,
  //       form: {
  //         grant_type: "authorization_code",
  //         client_id: config.stripe.clientId,
  //         client_secret: config.stripe.secretKey,
  //         code: req.query.code,
  //       },
  //       json: true,
  //     });

  //     if (expressAuthorized.error) {
  //       throw expressAuthorized.error;
  //     }

  //     // Update the model and store the Stripe account ID in the datastore:
  //     // this Stripe account ID will be used to issue payouts to the pilot
  //     req.user.stripeAccountId = expressAuthorized.stripe_user_id;
  //     await req.user.save();

  //     // Redirect to the Rocket Rides dashboard
  //     req.flash("showBanner", "true");
  //     res.redirect("/pilots/dashboard");
  //   } catch (err) {
  //     console.log("The Stripe onboarding process has not succeeded.");
  //     next(err);
  //   }
  // });

  // /**
  //  * POST /pilots/stripe/payout
  //  *
  //  * Generate a payout with Stripe for the available balance.
  //  */
  // router.post("/payout", userRequired, async (req, res) => {
  //   const user = req.user;
  //   try {
  //     // Fetch the account balance to determine the available funds
  //     const balance = await stripe.balance.retrieve({
  //       stripe_account: user.stripeAccountId,
  //     });
  //     // This demo app only uses USD so we'll just use the first available balance
  //     // (Note: there is one balance for each currency used in your application)
  //     const { amount, currency } = balance.available[0];
  //     // Create a payout
  //     const payout = await stripe.payouts.create(
  //       {
  //         amount: amount,
  //         currency: currency,
  //         statement_descriptor: config.appName,
  //       },
  //       { stripe_account: user.stripeAccountId }
  //     );
  //     console.log("Payout created:", payout);
  //     // Update the model and store the payout ID in the datastore:
  //     // this payout ID will be used to track the payout status
  //     // user.stripePayoutId = payout.id;
  //     // await user.save();
  //   } catch (err) {
  //     console.log(err);
  //   }
  //   return payout;
  // });
  // This middleware should be added before calling `applyMiddleware`.
  app.use(graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10 }));
  // error handler
  app.use((err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.render("error");
  });

  const httpServer = http.createServer(app);

  const getDynamicContext = async (ctx, msg, args) => {
    // ctx is the `graphql-ws` Context where connectionParams live
    if (ctx.connectionParams.authentication) {
      const currentUser = await findUser(connectionParams.authentication);
      return { currentUser };
    }
    return { currentUser: null };
  };

  // Creating the WebSocket server
  const wsServer = new WebSocketServer({
    // This is the `httpServer` we created in a previous step.
    server: httpServer,
    // Adding a context property lets you add data to your GraphQL operation context.
    context: authMiddleware,
    // Pass a different path here if your ApolloServer serves at
    // a different path.
    path: "/subscriptions",
  });

  const schema = makeExecutableSchema({ typeDefs, resolvers });

  // Hand in the schema we just created and have the
  // WebSocketServer start listening.
  const serverCleanup = useServer({ schema }, wsServer);

  // Same ApolloServer initialization as before, plus the drain plugin.
  const server = new ApolloServer({
    schema,
    context: authMiddleware,
    csrfPrevention: true,

    debug: process.env.NODE_ENV !== "production",
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),

      // Proper shutdown for the WebSocket server.
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose();
            },
          };
        },
      },
    ],
    introspection: process.env.NODE_ENV !== "production",
  });
  try {
    // More required logic for integrating with Express
    await server.start();
    //   await db();
    server.applyMiddleware({ app, path: "/" });
    const port = process.env.PORT || 4000;
    // Modified server startup
    await new Promise((resolve) => httpServer.listen({ port }, resolve));

    console.log(
      `🚀 Server ready at http://localhost:${port}${server.graphqlPath}`
    );

    console.log(
      `🚀 Server ready at http://localhost:${port}${wsServer.options.path}`
    );
  } catch (error) {
    console.log(error);
  }
}
startApolloServer(typeDefs, resolvers);
