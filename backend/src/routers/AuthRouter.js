const jwt = require('jsonwebtoken');
const express = require('express');

const AuthRouter = express.Router();

// POST
AuthRouter.post('/auth/token/refresh', async (req, res) => {
  try {
    const { refreshToken } = req.cookies;
    if (!refreshToken) {
      res.status(401).send({ error: 'Please authenticate.' });
      return;
    }

    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    res.status(200).send();
  } catch (e) {
    res.status(401).send({ error: 'Please authenticate.' });
  }
});

module.exports = AuthRouter;
