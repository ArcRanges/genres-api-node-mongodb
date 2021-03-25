const winston = require("winston");
const config = require("config");
require("winston-mongodb");
require("express-async-errors");

module.exports = function () {
  const env = process.env.NODE_ENV;

  winston.add(
    new winston.transports.File({ filename: "serverlog.log", level: "info" })
  );

  winston.add(
    new winston.transports.File({ filename: "errors.log", level: "error" })
  );

  if (env === "development") {
    winston.add(
      new winston.transports.Console({
        level: "info",
        format: winston.format.combine(
          winston.format.colorize(),
          winston.format.simple()
        ),
      })
    );

    winston.add(
      new winston.transports.MongoDB({
        db: config.get("db"),
        level: "error",
        options: {
          useUnifiedTopology: true,
        },
      })
    );

    winston.info("running in " + env + " environment");
  }

  process.on("uncaughtException", (error, origin) => {
    winston.error(error);
    process.exit(1);
  });

  process.on("unhandledRejection", (error, origin) => {
    winston.error(error);
    process.exit(1);
  });
};
