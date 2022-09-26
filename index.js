const express = require("express");
const cors = require("cors");
const errorMiddleware = require("./middlewares/errors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");

dotenv.config({ path: ".env" });

const app = express();

const port = process.env.PORT;

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

app.get("/setcookie", (req, res) => {
  res.cookie(`Cookie12`, `encrypted cookie string Value`, {
    maxAge: 5000,
    // expires works the same as the maxAge
    expires: new Date("01 12 2021"),
    secure: true,
    httpOnly: true,
    sameSite: "lax",
  });
  res.send("Cookie have been saved successfully");
});

const auth = require("./routes/auth");
const form = require("./routes/form");
const user = require("./routes/user");
// Importing all routes
app.use("/api", auth);
app.use("/api", form);
app.use("/api", user);

// Middleware to handle errors
app.use(errorMiddleware);

app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});