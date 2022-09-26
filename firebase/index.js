const { initializeApp } = require("firebase-admin/app");

const admin = require("firebase-admin");

const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const { getAuth } = require("firebase-admin/auth");
const { getFirestore } = require("firebase-admin/firestore");

const auth = getAuth();
const firestore = getFirestore();

module.exports = { auth, firestore };
