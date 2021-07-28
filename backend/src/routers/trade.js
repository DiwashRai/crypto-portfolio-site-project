const express = require('express');
const Trade = require('../models/trade');

const tradeRouter = express.Router();

// POST
tradeRouter.post('/trades', async (req, res) => {
  res.status(200).send();
});

// GET
tradeRouter.get('/trades', async (req, res) => {
  res.status(200).send();
});

// PATCH
tradeRouter.patch('/trades', async (req, res) => {
  res.status(200).send();
});

// DELETE
tradeRouter.delete('/delete', async (req, res) => {
  res.status(200).send();
});

module.exports = tradeRouter;
