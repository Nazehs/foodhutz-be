// Download the helper library from https://www.twilio.com/docs/node/install
// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken);
const from = process.env.SMSFROM;

const sentSMS = ({ to, message }) => {
  const message = await client.messages.create({
    body: `${message}`,
    from: `${from}`,
    to: `${to}`,
  });
  return { message };
};

module.exports = sentSMS;
