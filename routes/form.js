const express = require("express");
const router = express.Router();

const {
  createForm,
  getForm,
  submitForm,
  updateForm,
} = require("../controllers/formController");

router.route("/forms").post(createForm);
router.route("/forms/:formId").get(getForm);
router.route("/forms/:formId").post(submitForm);
router.route("/forms/:formId").put(updateForm);

module.exports = router;
