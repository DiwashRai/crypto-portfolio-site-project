const express = require('express');

const AuthRouter = express.Router();

// POST
AuthRouter.post('/auth/token/refresh', async (req, res) => {
  res.status(200).send();
});

module.exports = AuthRouter;
