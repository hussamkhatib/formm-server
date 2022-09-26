const express = require("express");
const router = express.Router();

const { sessionLogin } = require("../controllers/authController");

router.route("/sessionLogin").post(sessionLogin);

module.exports = router;
