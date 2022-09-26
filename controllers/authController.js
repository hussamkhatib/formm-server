const ErrorHandler = require("../utils/errorHandler");
const catchAysncErrors = require("../middlewares/catchAysncErrors");
const { auth } = require("../firebase");

// Login user  =>  /sessionLogin
exports.sessionLogin = catchAysncErrors(async (req, res, next) => {
  const idToken = req.body.idToken.toString();
  const expiresIn = 60 * 60 * 24 * 5 * 1000;
  auth.createSessionCookie(idToken, { expiresIn }).then(
    (sessionCookie) => {
      // Set cookie policy for session cookie.
      const options = {
        maxAge: expiresIn,
        httpOnly: true,
        secure: false,
      };
      res.cookie("session", sessionCookie, options);
      res.send(JSON.stringify({ status: "success" }));
    },
    (error) => {
      return next(new ErrorHandler("UNAUTHORIZED REQUEST!", 401));
    }
  );
});
