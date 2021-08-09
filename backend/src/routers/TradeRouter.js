const express = require('express');
const Trade = require('../models/trade');
const auth = require('../middleware/auth');

const tradeRouter = express.Router();

// POST
tradeRouter.post('/trades', auth, async (req, res) => {
  const trade = new Trade({
    ...req.body,
    owner: req.user._id,
  });

  try {
    await trade.save();
    res.status(201).send();
  } catch (err) {
    res.status(400).send();
  }
});

// GET
tradeRouter.get('/trades', auth, async (req, res) => {
  const usersTrades = await Trade.find({ owner: req.user._id });
  res.status(200).send(usersTrades);
});

// PATCH
tradeRouter.patch('/trades', async (req, res) => {
  res.status(200).send();
});

// DELETE
tradeRouter.delete('/trades', async (req, res) => {
  res.status(200).send();
});

module.exports = tradeRouter;
