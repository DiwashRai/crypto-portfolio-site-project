const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('./db/mongoose');
const UserRouter = require('./routers/UserRouter');
const TradeRouter = require('./routers/TradeRouter');
const AuthRouter = require('./routers/AuthRouter');

const app = express();

app.use(cors({ origin: true, credentials: true }));
app.use(cookieParser());
app.use(express.json());
app.use(UserRouter);
app.use(TradeRouter);
app.use(AuthRouter);

app.get('*', (req, res) => {
  res.status(404).send({ error: 'Invalid route' });
});

module.exports = app;
