const express = require('express');
const User = require('../models/user');

const userRouter = express.Router();

// POST
userRouter.post('/users', async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();
    res.status(201).send(user);
  } catch (err) {
    res.status(400).send(err);
  }
});

userRouter.post('/users/login', async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    res.status(200).send(user);
  } catch (err) {
    res.status(400).send();
  }
});

// GET
userRouter.get('/users', (req, res) => {
  res.status(200).send();
});

// PATCH
userRouter.patch('/users', (req, res) => {
  res.status(200).send();
});

// DELETE
userRouter.delete('/users', (req, res) => {
  res.status(200).send();
});

module.exports = userRouter;
