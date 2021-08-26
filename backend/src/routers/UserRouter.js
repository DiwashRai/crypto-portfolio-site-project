const express = require('express');
const UserModel = require('../models/UserModel');
const auth = require('../middleware/auth');

const UserRouter = express.Router();

// POST
UserRouter.post('/users', async (req, res) => {
  const user = new UserModel(req.body);

  try {
    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (err) {
    res.status(400).send(err);
  }
});

UserRouter.post('/users/login', async (req, res) => {
  try {
    const user = await UserModel.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();
    res.cookie('token', token, {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
    });
    res.status(200).send({ user, token });
  } catch (err) {
    res.status(400).send();
  }
});

UserRouter.post('/users/logout', auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => token !== req.token);
    await req.user.save();
    res.status(200).send();
  } catch (err) {
    res.status(400).send();
  }
});

// GET
UserRouter.get('/users/me', auth, async (req, res) => {
  res.status(200).send(req.user);
});

// PATCH
UserRouter.patch('/users/me', (req, res) => {
  res.status(200).send();
});

// DELETE
UserRouter.delete('/users/me', (req, res) => {
  res.status(200).send();
});

module.exports = UserRouter;
