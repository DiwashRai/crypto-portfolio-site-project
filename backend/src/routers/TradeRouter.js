const express = require('express');
const TradeModel = require('../models/TradeModel');
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
    const coinBalance = req.user.coinBalance.find(
      (element) => element.coinId === trade.coinId
    );
    const USDBalance = req.user.currencyBalance.find(
      (element) => element.currencySymbol === 'usd'
    );

    if (coinBalance) {
      coinBalance.quantity += trade.quantity;
    } else {
      req.user.coinBalance.push({
        coinId: trade.coinId,
        quantity: trade.quantity,
      });
    }

    if (USDBalance) {
      USDBalance.quantity -= trade.total;
    } else {
      req.user.currencyBalance.push({
        currencySymbol: 'usd',
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
  try {
    const usersTrades = await TradeModel.find({ owner: req.user._id });
    res.status(200).send(usersTrades);
  } catch (err) {
    res.status(400).send();
  }
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
  } catch (err) {
    res.status(500).send();
  }
});

// PATCH
TradeRouter.patch('/trades/:id', auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdate = ['tradeDate', 'coinId', 'quantity', 'cost', 'fee'];
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
    const coinBalance = req.user.coinBalance.find(
      (element) => element.coinId === trade.coinId
    );
    const USDBalance = req.user.currencyBalance.find(
      (element) => element.currencySymbol === 'usd'
    );

    updates.forEach((update) => {
      trade[update] = req.body[update];
    });
    trade = await trade.save();

    coinBalance.quantity += trade.quantity - originalQuantity;
    USDBalance.quantity -= trade.total - originalTotal;
    await req.user.save();

    res.status(200).send(trade);
  } catch (err) {
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
    const coinBalance = req.user.coinBalance.find(
      (element) => element.coinId === trade.coinId
    );
    const USDBalance = req.user.currencyBalance.find(
      (element) => element.currencySymbol === 'usd'
    );
    coinBalance.quantity -= trade.quantity;
    USDBalance.quantity += trade.total;

    await req.user.save();
    res.status(200).send(trade);
  } catch (err) {
    res.status(500).send();
  }
});

module.exports = TradeRouter;
