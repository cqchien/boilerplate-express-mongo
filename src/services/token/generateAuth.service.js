const moment = require('moment');
const { token: tokenConfig } = require('../../config/config');
const tokenTypes = require('../../constant/token');
const generateToken = require('./generate.service');
const saveToken = require('./save.service');

/**
 * Generate auth token
 * @param {ObjectId} id
 * @returns Promise<Object>
 */
const generateAuthToken = async ({ _id }) => {
  const userId = _id;
  // TODO:Set the time expiration for access and refresh token
  // NOTE: moment().add(): Adding time to an existing moment
  const accessTokenExpires = moment().add(tokenConfig.accessExpiration, 'minutes');
  const refreshTokenExpires = moment().add(tokenConfig.refreshExpiration, 'days');

  // TODO: Generate token
  // NOTE: Use jwt.sign() to create new token
  const accessToken = generateToken(userId, tokenTypes.ACCESS, accessTokenExpires);
  const refreshToken = generateToken(userId, tokenTypes.REFRESH, refreshTokenExpires);

  // TODO: Save token in db
  const tokenDto = {
    token: refreshToken,
    user: userId,
    type: tokenTypes.REFRESH,
    expires: refreshTokenExpires.toDate(),
  };

  await saveToken(tokenDto);

  // return data
  return {
    access: {
      token: accessToken,
      expires: accessTokenExpires.toDate(),
    },
    refresh: {
      token: refreshToken,
      expires: refreshTokenExpires.toDate(),
    },
  };
};

module.exports = generateAuthToken;
