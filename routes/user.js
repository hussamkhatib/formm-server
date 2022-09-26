const express = require("express");
const router = express.Router();

const { getUserForms } = require("../controllers/userController");

router.route("/me/forms").get(getUserForms);

module.exports = router;
