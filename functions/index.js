/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

// const {onRequest} = require("firebase-functions/v2/https");
// const logger = require("firebase-functions/logger");

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const stripe = require("stripe")(functions.config().stripe.secret);
const cors = require("cors")({ origin: true });

admin.initializeApp();

exports.createPaymentIntent = functions.https.onRequest(async (req, res) => {
  cors(req, res, async () => {
    try {
      const { paymentMethodId, amount } = req.body;
      if (!paymentMethodId || !amount) {
        throw new Error("Missing paymentMethodId or amount");
      }
      const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency: "usd",
        payment_method: paymentMethodId,
        confirm: true,
        automatic_payment_methods: {
          enabled: true,
          allow_redirects: "never", // Disable redirect-based payment methods
        },
      });

      res.status(200).send({ success: true, paymentIntent });
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  });
});
