const winston = require("winston");

const errorLogger = winston.createLogger({
  transports: new winston.transports.File({ filename: "errors.log" }),
});

function errorHandler(err, req, res, next) {
  errorLogger.error(err.message);
  res.status(500).send("Internal Server Error");
}

module.exports = {
  errorHandler,
  errorLogger,
};
