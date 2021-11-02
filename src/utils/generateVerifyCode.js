const generateVerifyCode = (numberOfDigits) => {
  const n = parseInt(numberOfDigits, 10);
  const min = 10 ** (n - 1);
  const max = 10 ** n - 1;
  const number = Math.floor(Math.random() * (max - min + 1) + min);
  return number.toString();
};

module.exports = generateVerifyCode;
