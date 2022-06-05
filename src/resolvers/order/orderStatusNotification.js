const pubsub = require("../pubSub");

const orderStatusNotification = (root, args, context) => {
  const { orderId } = args;
  const { userId } = context.currentUser;
  //   const { pubsub } = context;

  const order = Order.findOne({
    where: {
      id: orderId,
      userId,
    },
  });

  if (!order) {
    throw new Error("Order not found");
  }

  const { status } = order;

  const notification = {
    orderId,
    status,
  };

  pubsub.publish("ORDER_STATUS_CHANGE", {
    orderStatusChange: notification,
  });

  return notification;
};

export default orderStatusNotification;
