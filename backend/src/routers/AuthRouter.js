const jwt = require('jsonwebtoken');
const express = require('express');
const RefreshTokenModel = require('../models/RefreshTokenModel');
const createAccessToken = require('../utils/accessToken');

const AuthRouter = express.Router();

// POST
AuthRouter.post('/auth/token/refresh', async (req, res) => {
  try {
    const { refreshToken } = req.cookies;
    if (!refreshToken) throw new Error();

    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    const token = await RefreshTokenModel.findOne({
      token: refreshToken,
      user: decoded,
    });

    if (token) {
      const accessToken = createAccessToken(decoded);
      res.status(200).send({ accessToken });
      return;
    }
    res.status(401).send({ error: 'Please authenticate.' });
  } catch (err) {
    res.status(401).send({ error: 'Please authenticate.' });
  }
});

// DELETE
AuthRouter.delete('/auth/token/revoke', async (req, res) => {
  try {
    const { refreshToken } = req.cookies;
    if (!refreshToken) throw new Error();

    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    const token = await RefreshTokenModel.findOneAndDelete({
      token: refreshToken,
      user: decoded,
    });
    if (!token) throw new Error();
    res.clearCookie('refreshToken');
    res.status(200).send();
  } catch (err) {
    res.status(400).send();
  }
});

module.exports = AuthRouter;
