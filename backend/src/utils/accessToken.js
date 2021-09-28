const jwt = require('jsonwebtoken');

function createAccessToken(userId) {
  return jwt.sign({ _id: userId }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '15m',
  });
}

module.exports = createAccessToken;
