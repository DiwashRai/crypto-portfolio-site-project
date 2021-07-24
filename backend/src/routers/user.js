const express = require('express');

const userRouter = express.Router();

// POST
userRouter.post('/users', (req, res) => {
  console.log('/users route hit!');
  res.status(200).send();
});

// GET

// PATCH

// DELETE

module.exports = userRouter;
