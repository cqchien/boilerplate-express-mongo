const httpStatus = require('http-status');
const mongoose = require('mongoose');
const config = require('../config/config');
const logger = require('../config/logger');
const Exception = require('../utils/exception');

/**
 * Convert Error which is not an instance of Exception like error with status 400, 500, etc,
 * to be instance of Exception
 * @param {*} err
 * @param {*} _req
 * @param {*} _res
 * @param {*} next
 */
const convertException = (err, req, res, next) => {
  let error = err;
  if (!(error instanceof Exception)) {
    const statusCode = error.statusCode || error instanceof mongoose.Error
      ? httpStatus.BAD_REQUEST : httpStatus.INTERNAL_SERVER_ERROR;
    const message = error.message || httpStatus[statusCode];
    error = new Exception(statusCode, message, err.stack);
  }
  next(error);
};

/**
 * Handle error before returning to user
 * @param {*} err
 * @param {*} _req
 * @param {*} res
 * @param {*} next
 */
// eslint-disable-next-line no-unused-vars
const handleException = (err, req, res, next) => {
  const { statusCode, message } = err;
  // TODO: Format response to send to user
  const response = {
    success: false,
    statusCode,
    message,
    ...(config.env === 'development' && { stack: err.stack }),
  };

  if (config.env === 'development') {
    logger.error(err);
  }

  res.status(statusCode).send(response);
};

module.exports = {
  convertException,
  handleException,
};
