/* eslint-disable no-shadow */
const { createLogger, format, transports } = require('winston');

const {
  combine, colorize, splat, printf, timestamp, uncolorize,
} = format;
const config = require('./config');

// To rewrite message in info
const enumerateErrorFormat = format((info) => {
  // Check info whether is an instance of Error or not. Return boolean
  if (info instanceof Error) {
    //  Assign message: info.stack and then copy it to info
    // and replace message in info to new message
    Object.assign(info, { message: info.stack });
  }
  return info;
});

const logger = createLogger({
  level: config.env === 'development' ? 'debug' : 'info',
  format: combine(
    enumerateErrorFormat(),
    config.env === 'development' ? colorize() : uncolorize(),
    // String interpolation
    splat(),
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    printf(({ level, message, timestamp }) => `${timestamp}: ${level}: ${message}`),
  ),
  transports: [
    new transports.Console({
      stderrLevels: ['error'],
    }),
  ],
});
module.exports = logger;
