const { initializeApp } = require("firebase-admin/app");
require("dotenv").config();
const serviceAccount = JSON.parse(process.env.FIREBASE_CREDS);

const admin = require("firebase-admin");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const { getAuth } = require("firebase-admin/auth");
const { getFirestore } = require("firebase-admin/firestore");

const auth = getAuth();
const firestore = getFirestore();

module.exports = { auth, firestore };
