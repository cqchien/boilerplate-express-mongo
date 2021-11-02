const bcrypt = require('bcrypt');
const userModel = require('../../models/user.model');
const { SALT } = require('../../constant/bcrypt');

const updateUser = (userId, params) => {
  let { password } = params;

  if (password) {
    password = bcrypt.hashSync(password, SALT);
  }

  const updateData = { ...params, password };
  return userModel.updateOne({ _id: userId }, updateData);
};

module.exports = updateUser;
