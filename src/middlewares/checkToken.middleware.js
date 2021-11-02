const httpStatus = require('http-status');
const config = require('../config/config');
const Exception = require('../utils/exception');
const verifyToken = require('../utils/verifyToken');

const checkToken = async (req, res, next) => {
  const token = req.headers?.authorization?.split(' ')[1];

  if (!token) {
    next(new Exception(httpStatus.FORBIDDEN, 'No Token Provided.'));
  } else {
    try {
      const decode = await verifyToken(token, config.token.secret);
      req.user = decode;
      next();
    } catch (error) {
      next(new Exception(httpStatus.UNAUTHORIZED, 'Token Is Invalid'));
    }
  }
};

module.exports = checkToken;
