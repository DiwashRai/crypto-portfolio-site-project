const express = require('express');
const TradeModel = require('../models/TradeModel');
const UserModel = require('../models/UserModel');
const auth = require('../middleware/auth');

const TradeRouter = express.Router();

// POST
TradeRouter.post('/trades', auth, async (req, res) => {
  const trade = new TradeModel({
    ...req.body,
    owner: req.user._id,
  });

  try {
    await trade.save();
    const coinBalance = req.user.balance.find(
      (element) => element.symbol === 'ETH'
    );
    const USDBalance = req.user.balance.find(
      (element) => element.symbol === 'USD'
    );

    if (coinBalance) {
      coinBalance.quantity += trade.quantity;
    } else {
      req.user.balance.push({
        symbol: trade.symbol,
        quantity: trade.quantity,
      });
    }

    if (USDBalance) {
      USDBalance.quantity -= trade.total;
    } else {
      req.user.balance.push({
        symbol: 'USD',
        quantity: -trade.total,
      });
    }

    await req.user.save();
    res.status(201).send(trade);
  } catch (err) {
    res.status(400).send();
  }
});

// GET
TradeRouter.get('/trades', auth, async (req, res) => {
  const usersTrades = await TradeModel.find({ owner: req.user._id });
  res.status(200).send(usersTrades);
});

// PATCH
TradeRouter.patch('/trades', async (req, res) => {
  res.status(200).send();
});

// DELETE
TradeRouter.delete('/trades', async (req, res) => {
  res.status(200).send();
});

module.exports = TradeRouter;
