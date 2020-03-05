const winston = require('winston');

const createExpressWinstonOptions = () => ({
  transports: [
    new winston.transports.Console(),
  ],
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.json(),
  ),
});

const createLogger = (name) => {
  return winston.createLogger({
    transports: [
      new winston.transports.Console(),
    ],
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.json(),
    ),
    defaultMeta: {
      name,
    },
  });
};

module.exports = { createLogger, createExpressWinstonOptions };
