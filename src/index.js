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
  app.get("/config", async (req, res) => {
    res.json({
      publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
    });
  });

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
