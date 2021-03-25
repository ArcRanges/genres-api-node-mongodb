const express = require("express");
const genres = require("../routes/genres");
const customers = require("../routes/customers");
const movies = require("../routes/movies");
const rentals = require("../routes/rentals");
const users = require("../routes/users");
const auth = require("../routes/auth");
const { errorHandler } = require("../middleware/error");
const morgan = require("morgan");
const winston = require("winston");

module.exports = function (app) {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // if (process.env.NODE_ENV === "development") {
  //   app.use(morgan("tiny"));
  //   winston.info("morgan enabled...");
  // }

  app.use("/api/genres", genres);
  app.use("/api/customers", customers);
  app.use("/api/movies", movies);
  app.use("/api/rentals", rentals);
  app.use("/api/users", users);
  app.use("/api/auth", auth);

  app.use(errorHandler);
};
