const tokenModel = require('../../models/token.model');
const tokenTypes = require('../../constant/token');

const getRefreshToken = async (refreshToken) => {
  const refreshTokenInfo = await tokenModel
    .findOne(
      { token: refreshToken, type: tokenTypes.REFRESH },
    )
    .populate('user', '_id');
  return refreshTokenInfo;
};

module.exports = getRefreshToken;
