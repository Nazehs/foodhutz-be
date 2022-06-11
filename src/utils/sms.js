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

    console.log(`[INFO - sentSMS]: SMS sent to ${to}`);
    return response;
  } catch (error) {
    console.log(
      `[ERROR - sentSMS]: Failed to send SMS to ${to} | ${error.message}`
    );
  }
};

const verifySMS = async ({ to, code }) => {
  try {
    const response = await client.verify
      .services(verifySID)
      .verificationChecks.create({ to, code });
    console.log(`[INFO - verifySMS]: SMS verified successfully`);
    return response;
  } catch (error) {
    console.log(`[ERROR - verifySMS]: Failed to verify SMS | ${error.message}`);
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
