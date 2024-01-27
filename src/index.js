require("dotenv").config();
require("./db/db");
const session = require("cookie-session");
const cookieParser = require("cookie-parser");
// const passport = require("passport");
const bodyParser = require("body-parser");

const typeDefs = require("./schema");
const resolvers = require("./resolvers");
const { authMiddleware } = require("./utils/auth");
const { ApolloServer } = require("apollo-server-express");
const {
  ApolloServerPluginDrainHttpServer,
  // ApolloServerPluginUsageReporting,
} = require("apollo-server-core");

const { graphqlUploadExpress } = require("graphql-upload");
const { makeExecutableSchema } = require("@graphql-tools/schema");
const { WebSocketServer } = require("ws");
const { useServer } = require("graphql-ws/lib/use/ws");
const express = require("express");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const http = require("http");
const updateOrderPaymentStatus = require("./resolvers/order/updateOrderPaymentStatus");

async function startApolloServer(typeDefs, resolvers) {
  // Required logic for integrating with Express
  const app = express();

  // Enable sessions using encrypted cookies
  app.use(cookieParser("config.secret"));
  app.use(
    session({
      cookie: { maxAge: 60000 },
      secret: "config.secret",
      signed: true,
      resave: false,
    })
  );

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

        // Handle the event
        switch (event.type) {
          case "payment_intent.succeeded":
            // update the order status to paid
            // need to check if it's a payout or payment collection
            await updateOrderPaymentStatus(
              paymentIntent.metadata.orderId,
              "Paid"
            );
            break;
          case "customer.created":
            // update the order status to paid
            break;
          case "payment_intent.created":
            await updateOrderPaymentStatus(
              paymentIntent.metadata.orderId,
              "Pending"
            );
            console.log(
              `🏵 [INFO - WEBHOOK] payment intent created! Payment Intent(${paymentIntent.id} : ${paymentIntent.amount} : ${paymentIntent.status})`
            );

            break;

          case "payment_intent.processing":
            await updateOrderPaymentStatus(
              paymentIntent.metadata.order,
              "Processing"
            );
            // update the order status to payment processing
            break;

          case "payment_intent.payment_failed":
            // update the database with the failed payment failed
            // update the order status to payment failed
            await updateOrderPaymentStatus(
              paymentIntent.metadata.order,
              "Failed"
            );
            break;

          case "payment_intent.requires_action":
            // update the database with the failed payment pending action
            await updateOrderPaymentStatus(
              paymentIntent.metadata.order,
              "Action Required"
            );
            break;

          case "payment_intent.canceled":
            // update the order status to payment canceled
            await updateOrderPaymentStatus(
              paymentIntent.metadata.order,
              "Cancelled"
            );
            break;

          case "checkout.session.completed":
            // update the database with the failed payment canceled
            await updateOrderPaymentStatus(
              paymentIntent.metadata.order,
              "Completed"
            );
            break;

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

  // Initialize Passport and restore any existing authentication state
  // app.use(passport.initialize());
  // app.use(passport.session());
  // parse application/x-www-form-urlencoded
  app.use(bodyParser.urlencoded({ extended: false }));

  // parse application/json
  app.use(bodyParser.json());
  function pilotRequired(req, res, next) {
    if (!req.isAuthenticated()) {
      return res.redirect("/login");
    }
    next();
  }

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
  app.use("/payment", require("./REST/stripe"));

  const httpServer = http.createServer(app);

  const getDynamicContext = async (ctx, msg, args) => {
    if (ctx.connectionParams.authentication) {
      const currentUser = await findUser(connectionParams.authentication);
      return { currentUser };
    }
    return { currentUser: null };
  };

  // Creating the WebSocket server
  const wsServer = new WebSocketServer({
    server: httpServer,
    context: authMiddleware,
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
    apollo: {
      key: process.env.APOLLO_KEY,
      graphRef: process.env.APOLLO_GRAPH_REF,
    },
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      // ApolloServerPluginUsageReporting({
      //   generateClientInfo: ({ request }) => {
      //     const { clientName, clientVersion } = userSuppliedLogic(request);
      //     return {
      //       clientName,
      //       clientVersion,
      //     };
      //   },
      // }),

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
    await server.start();
    server.applyMiddleware({ app, path: "/" });
    const port = process.env.PORT || 4000;
    await new Promise((resolve) => httpServer.listen({ port }, resolve));

    console.log(
      `🚀 Server ready at http://localhost:${port}${server.graphqlPath}`
    );

    console.log(
      `🚀 Web socket Server ready at http://localhost:${port}${wsServer.options.path}`
    );
  } catch (error) {
    console.log(error);
  }
}
startApolloServer(typeDefs, resolvers);
