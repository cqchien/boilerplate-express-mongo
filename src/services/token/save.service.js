const tokenModel = require('../../models/token.model');

/**
 * Save token in db
 * @param {Object} {token, user, type, expires}
 * @returns Promise<Token>
 */
const saveToken = async ({
  token, user, type, expires,
}) => {
  const newToken = await tokenModel.create({
    token,
    user,
    type,
    expires,
  });
  return newToken;
};

module.exports = saveToken;
