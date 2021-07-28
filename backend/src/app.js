const express = require('express');
require('./db/mongoose');
const userRouter = require('./routers/user');
const tradeRouter = require('./routers/trade');

const app = express();

app.use(express.json());
app.use(userRouter);
app.use(tradeRouter);

app.get('*', (req, res) => {
  res.status(404).send({ error: 'Invalid route' });
});

module.exports = app;
