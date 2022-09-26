const ErrorHandler = require("../utils/errorHandler");
const catchAysncErrors = require("../middlewares/catchAysncErrors");
const { firestore } = require("../firebase");

const userUid = "Lr3G9Q5EGHUaIiSTXyDfhLpxxd23";
// create a new form =>  /forms
exports.createForm = catchAysncErrors(async (req, res, next) => {
  // @NOTE: verify if new Date() is safe in server side
  const now = new Date();

  const result = await firestore.collection(`/users/${userUid}/forms`).add({
    createdAt: now,
    updatedAt: now,
    ...req.body,
  });
  // @NOTE : responses, owner, ownerId are not included in the request body

  res.status(200).json({
    id: result.id,
  });
});

// update a form =>  /forms/:id
exports.updateForm = catchAysncErrors(async (req, res, next) => {
  const now = new Date();
  const { formId } = req.params;
  const result = await firestore
    .collection(`/users/${userUid}/forms`)
    .doc(formId)
    .update({
      updatedAt: now,
      ...req.body,
    });

  res.status(200).json({
    id: formId,
  });
});

// delete a form =>  /forms/:id
exports.deleteForm = catchAysncErrors(async (req, res, next) => {
  const { formId } = req.params;
  await firestore.collection(`/users/${userUid}/forms`).doc(formId).delete();
  res.status(204).end();
});

// get a form =>  /forms/:formId
exports.getForm = catchAysncErrors(async (req, res, next) => {
  const { formId } = req.params;

  const result = await firestore
    .collection(`/users/${userUid}/forms`)
    .doc(formId)
    .get();

  if (!result.exists) {
    return next(new ErrorHandler("Form not found", 404));
  }

  res.status(200).json(result.data());
});

// submit a form =>  /forms/:formId
exports.submitForm = catchAysncErrors(async (req, res, next) => {
  const { response } = req.body;
  const { formId } = req.params;
  await firestore
    .collection(`/users/${userUid}/forms/${formId}/responses`)
    .add({
      time: new Date(),
      ...response,
    });
  res.status(200).end();
});
