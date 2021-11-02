const verifyCodeConstant = require('../../constant/verifyCode');

const checkVerifyCode = async (user, codeToVerify) => {
  const { code, updatedAt } = user.verifyCode;

  // Validate expire time of code to verify
  const expireTime = new Date().getTime() - new Date(updatedAt).getTime();

  return code === codeToVerify && expireTime <= verifyCodeConstant.EXPIRETIME;
};

module.exports = checkVerifyCode;
