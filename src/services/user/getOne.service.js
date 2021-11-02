const userModel = require('../../models/user.model');
/**
 * find a user which have id or email
 * @param {*} {id, email}
 * @returns user
 */
const getUserByEmailOrId = async ({ id, email }) => {
  const _id = id;
  const query = _id ? { _id } : { email };
  // get all data from table without password
  const user = await userModel.findOne(query);

  return user;
};

module.exports = getUserByEmailOrId;
