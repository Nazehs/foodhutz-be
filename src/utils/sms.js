// Download the helper library from https://www.twilio.com/docs/node/install
// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSID = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require("twilio")(accountSID, authToken);
const verifySID = process.env.TWILIO_VERIFY_SID;

const sentSMS = async (to) => {
  try {
    const response = await client.verify
      .services(verifySID)
      .verifications.create({ to, channel: "sms" });

    // const service = await client.verify.services(verifySID).fetch();
    // console.log(service);
    // client.verify.services.list({ limit: 40, lookupEnabled: true });
    return response;
  } catch (error) {
    console.log(error);
  }
};

const verifySMS = async ({ to, code }) => {
  try {
    const response = await client.verify
      .services(verifySID)
      .verificationChecks.create({ to, code });
    return response;
  } catch (error) {
    console.log(error);
  }
};

const createSMSService = async (to) => {
  try {
    const response = await client.verify.services(verifySID);
    verificationChecks
      .create({ to, code: "+44" })
      .then((verification_check) => console.log(verification_check.status));
    return response;
  } catch (error) {
    console.log(error);
  }
};

const updateSMSService = async () => {
  try {
    const response = client.verify.services.list({ limit: 20, lookupEnabled });

    return response;
  } catch (error) {
    console.log(error);
  }
};

module.exports = { sentSMS, verifySMS, createSMSService };
