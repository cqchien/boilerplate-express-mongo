const bcrypt = require('bcrypt');
const { SALT } = require('../../constant/bcrypt');
const userModel = require('../../models/user.model');

/**
 * Create a new user
 * @param {Object} { name, avatar, email, password, role }
 * @returns Promise<userModel>
 */
const createUser = async ({
  name, avatar, email, password, role,
}) => {
  const hashPassword = bcrypt.hashSync(password, SALT);
  const newUser = await userModel.create({
    name,
    avatar,
    email,
    password: hashPassword,
    role,
  });

  return newUser;
};

module.exports = createUser;
