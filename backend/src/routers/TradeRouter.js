const express = require('express');
const TradeModel = require('../models/TradeModel');
const auth = require('../middleware/auth');

const TradeRouter = express.Router();

// POST
tradeRouter.post('/trades', auth, async (req, res) => {
  const trade = new TradeModel({
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
  const usersTrades = await TradeModel.find({ owner: req.user._id });
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

module.exports = TradeRouter;
