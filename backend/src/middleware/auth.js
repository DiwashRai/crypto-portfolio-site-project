const jwt = require('jsonwebtoken');
const User = require('../models/UserModel');

const auth = async (req, res, next) => {
  try {
    let { token } = req.cookies;
    if (!token) {
      token = req.header('Authorization').replace('Bearer ', '');
    }
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user = await User.findOne({
      _id: decoded._id,
    });

    if (!user) {
      throw new Error();
    }

    req.token = token;
    req.user = user;
    next();
  } catch (err) {
    res.status(401).send({ error: 'Please authenticate.' });
  }
};

module.exports = auth;
