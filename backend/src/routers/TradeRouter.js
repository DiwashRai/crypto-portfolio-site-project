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
      (element) => element.symbol === trade.symbol
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
    res.status(500).send();
  }
});

// GET
TradeRouter.get('/trades', auth, async (req, res) => {
  const usersTrades = await TradeModel.find({ owner: req.user._id });
  res.status(200).send(usersTrades);
});

TradeRouter.get('/trades/:id', auth, async (req, res) => {
  try {
    const trade = await TradeModel.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });

    if (!trade) {
      res.status(404).send();
    }
    res.status(200).send(trade);
  } catch (e) {
    res.status(500).send();
  }
});

// PATCH
TradeRouter.patch('/trades/:id', auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdate = ['tradeDate', 'symbol', 'quantity', 'cost', 'fee'];
  const isValidOperation = updates.every((update) =>
    allowedUpdate.includes(update)
  );

  if (!isValidOperation) {
    res.status(400).send({ error: 'Invalid updates!' });
    return;
  }

  try {
    let trade = await TradeModel.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });

    if (!trade) {
      res.status(404).send();
    }
    const originalQuantity = trade.quantity;
    const originalTotal = trade.total;
    const coinBalance = req.user.balance.find(
      (element) => element.symbol === trade.symbol
    );
    const USDBalance = req.user.balance.find(
      (element) => element.symbol === 'USD'
    );

    updates.forEach((update) => {
      trade[update] = req.body[update];
    });
    trade = await trade.save();

    coinBalance.quantity += trade.quantity - originalQuantity;
    USDBalance.quantity -= trade.total - originalTotal;
    await req.user.save();

    res.status(200).send(trade);
  } catch (e) {
    res.status(400).send();
  }
});

// DELETE
TradeRouter.delete('/trades/:id', auth, async (req, res) => {
  try {
    const trade = await TradeModel.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id,
    });
    if (!trade) {
      res.status(404).send();
    }
    const coinBalance = req.user.balance.find(
      (element) => element.symbol === trade.symbol
    );
    const USDBalance = req.user.balance.find(
      (element) => element.symbol === 'USD'
    );
    coinBalance.quantity -= trade.quantity;
    USDBalance.quantity += trade.total;

    await req.user.save();
    res.status(200).send(trade);
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = TradeRouter;
