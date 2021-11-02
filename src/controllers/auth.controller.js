const httpStatus = require('http-status');
const bcrypt = require('bcrypt');
const moment = require('moment');
const createUser = require('../services/user/create.service');
const generateAuthToken = require('../services/token/generateAuth.service');
const handleSuccess = require('../utils/successfulHandler');
const tokenTypes = require('../constant/token');
const getUserByEmailOrId = require('../services/user/getOne.service');
const Exception = require('../utils/exception');
const getRefreshToken = require('../services/token/getRefreshToken.service');
const verifyToken = require('../utils/verifyToken');
const { token: tokenConfig } = require('../config/config');
const generateToken = require('../services/token/generate.service');

const register = async (req, res, next) => {
  const { email, password, name } = req.body;
  try {
    // Check Email
    const user = await getUserByEmailOrId({ email });
    if (user) {
      throw new Exception(httpStatus.CONFLICT, 'Email Already Taken');
    }

    // Create new User
    const newUser = await createUser({
      email,
      name,
      password,
    });

    // Create Token
    const token = await generateAuthToken(newUser);

    return handleSuccess(res, { token }, httpStatus.CREATED);
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    // check Email
    const user = await getUserByEmailOrId({ email });

    // check password whether match or not
    const isMatchPassword = await bcrypt.compare(password, user?.password);
    if (!isMatchPassword || !user) {
      throw new Exception(httpStatus.UNAUTHORIZED, 'Incorrect Email Or Password');
    }

    // create token
    const token = await generateAuthToken(user);

    return handleSuccess(res, { token }, httpStatus.CREATED);
  } catch (error) {
    next(error);
  }
};

const loginWithSocialNetwork = async (req, res, next) => {
  const { email, name, avatar } = req.user;
  try {
    let user;
    // Validate email
    if (!email) {
      throw new Exception(httpStatus.UNAUTHORIZED, 'Email Is Invalid');
    }

    // Check email whether exist or not
    user = await getUserByEmailOrId({ email });
    // If user does not exist, we create new user;
    if (!user) {
      user = await createUser({
        name,
        avatar,
        email,
        password: '',
      });
    }

    // Create Token
    const token = await generateAuthToken(user);

    return handleSuccess(res, { token }, httpStatus.CREATED);
  } catch (error) {
    next(error);
  }
};

const getAccessToken = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    // Validate Token
    await verifyToken(refreshToken, tokenConfig.secret);

    // Get refreshToken in db token
    const refreshTokenDetail = await getRefreshToken(refreshToken);
    if (!refreshTokenDetail) {
      throw new Exception(httpStatus.NOT_FOUND, 'Token Is Invalid');
    }

    const userId = refreshTokenDetail.user._id;

    // Create new access token
    const accessTokenExpires = moment().add(tokenConfig.accessExpiration, 'minutes');
    const accessToken = generateToken(userId, tokenTypes.ACCESS, accessTokenExpires);

    return handleSuccess(res, { accessToken }, httpStatus.CREATED);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login,
  loginWithSocialNetwork,
  getAccessToken,
};
