const jwt = require('jsonwebtoken');
const { token: tokenConfig } = require('../../config/config');

/**
 * Generate a new token
 * @param {ObjectId} userId
 * @param {tokenTypes} type
 * @param {Moment} expires
 * @returns string
 */
const generateToken = (userId, type, expires) => {
  // TODO: get secret key of user from config.
  // NOTE: This likes the signature of user. Auth Server will check token base on this signature
  const sign = tokenConfig.secret;

  // TODO: Set payload to assign to token
  // NOTE: moment().unix(): to create a moment from a Unix timestamp
  const payload = {
    id: userId,
    exp: expires.unix(),
    type,
  };

  return jwt.sign(payload, sign);
};

module.exports = generateToken;
