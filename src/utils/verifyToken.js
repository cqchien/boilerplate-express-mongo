const jwt = require('jsonwebtoken');

const verifyToken = (token, key) => new Promise((resolve, reject) => {
  jwt.verify(token, key, (err, decoded) => {
    if (err) {
      return reject(err);
    }
    resolve(decoded);
  });
});

module.exports = verifyToken;
