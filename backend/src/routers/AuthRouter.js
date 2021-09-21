const express = require('express');

const AuthRouter = express.Router();

// POST
AuthRouter.post('/auth/token/refresh', async (req, res) => {
  try {
    res.status(200).send();
  } catch {
    res.status(400).send();
  }
});

module.exports = AuthRouter;
