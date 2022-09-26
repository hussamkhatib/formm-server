const ErrorHandler = require("../utils/errorHandler");
const catchAysncErrors = require("../middlewares/catchAysncErrors");
const { firestore } = require("../firebase");

const userUid = "Lr3G9Q5EGHUaIiSTXyDfhLpxxd23";
// get user forms =>  /me/forms
exports.getUserForms = catchAysncErrors(async (req, res, next) => {
  // @NOTE: verify if new Date() is safe in server side
  let result = [];
  await firestore
    .collection(`/users/${userUid}/forms`)
    .get()
    .then((querySnapshot) => {
      result = querySnapshot.docs.map((doc) => ({
        formId: doc.id,
        ...doc.data(),
      }));
    });
  res.status(200).json(result);
  // @NOTE : responses, owner, ownerId are not included in the request body
});
