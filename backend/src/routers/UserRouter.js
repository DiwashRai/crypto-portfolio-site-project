const jwt = require('jsonwebtoken');
const express = require('express');
const UserModel = require('../models/UserModel');
const RefreshTokenModel = require('../models/RefreshTokenModel');
const auth = require('../middleware/auth');

const UserRouter = express.Router();

// POST
UserRouter.post('/users', async (req, res) => {
  const user = new UserModel(req.body);

  try {
    await user.save();
    const refreshToken = await RefreshTokenModel.createRefreshToken(user);
    const accessToken = jwt.sign(
      user._id.toString(),
      process.env.ACCESS_TOKEN_SECRET
    );
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
    });
    res.status(201).send({ user, auth: { accessToken } });
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
    const refreshToken = await RefreshTokenModel.createRefreshToken(user);
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
    });
    const accessToken = jwt.sign(
      user._id.toString(),
      process.env.ACCESS_TOKEN_SECRET
    );
    res.status(200).send({ user, auth: { accessToken } });
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
UserRouter.patch('/users/me', (_req, res) => {
  res.status(200).send();
});

// DELETE
UserRouter.delete('/users/me', (_req, res) => {
  res.status(200).send();
});

module.exports = UserRouter;
