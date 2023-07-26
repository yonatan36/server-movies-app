const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const initialData = require("./initialData/initialData");
const apiRouter = require("./routes/api");
const loggersService = require("./utils/loggers/loggerServise");

// Define an array of allowed origins
const allowedOrigins = [
  process.env.ORIGIN,
  "http://127.0.0.1:5500",
  "http://localhost:3000",
  "http://localhost:8181",
];

// Create the `origin` variable by finding the first non-null origin from the array
const origin =
  allowedOrigins.find((value) => value != null) || "http://localhost:3000";

const app = express();

app.use(
  cors({
    origin,
    credentials: true,
    optionsSuccessStatus: 200,
  })
);

app.use(loggersService.logger); // Specify the "combined" format

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
initialData();

app.use("/api", apiRouter);

app.use((req, res, next) => {
  res.status(404).json({ msg: "Page not found!" });
});

module.exports = app;
