const httpStatus = require('http-status');
const Joi = require('joi');
const Exception = require('../utils/exception');

const validate = (schema) => (req, res, next) => {
  const { error } = Joi.compile(schema)
    .prefs({ errors: { label: 'key' } })
    .validate(req.body);
  // handle error
  if (error) {
    const errorMessages = error.details.map((errorDetail) => errorDetail.message).join('; ');
    return next(new Exception(httpStatus.BAD_REQUEST, errorMessages));
  }
  return next();
};

module.exports = validate;
