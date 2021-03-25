const winston = require("winston");
require("winston-mongodb");
require("express-async-errors");

module.exports = function () {
  winston.add(
    new winston.transports.File({ filename: "serverlog.log", level: "info" })
  );

  winston.add(
    new winston.transports.File({ filename: "errors.log", level: "error" })
  );

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
      db: "mongodb://localhost:27017/chillax",
      level: "error",
      options: {
        useUnifiedTopology: true,
      },
    })
  );

  process.on("uncaughtException", (error, origin) => {
    winston.error(error);
    process.exit(1);
  });

  process.on("unhandledRejection", (error, origin) => {
    winston.error(error);
    process.exit(1);
  });
};
