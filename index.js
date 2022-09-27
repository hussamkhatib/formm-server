const express = require("express");
const cors = require("cors");
const errorMiddleware = require("./middlewares/errors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const ErrorHandler = require("./utils/errorHandler");

dotenv.config({ path: ".env" });

const app = express();

app.use(
  cors({
    // @TODO: handle for prod later
    origin: ["http://localhost:3001", "http://localhost:5173"],
    credentials: true,
  })
);

// allow the app to use cookieparser
app.use(helmet());
// Set cookie parser
app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

const auth = require("./routes/auth");
const form = require("./routes/form");
const user = require("./routes/user");
// Importing all routes
app.use("/api", auth);
app.use("/api", form);
app.use("/api", user);

// Handle unhandled routes
app.all("*", (req, res, next) => {
  next(new ErrorHandler(`${req.originalUrl} route not found`, 404));
});

// Middleware to handle errors
app.use(errorMiddleware);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});

// Handling Unhandled Promise Rejection
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log("Shutting down the server due to Unhandled promise rejection.");
  server.close(() => {
    process.exit(1);
  });
});
