const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('../../src/models/user');
const Trade = require('../../src/models/trade');

const userOneId = new mongoose.Types.ObjectId();
const userOne = {
  _id: userOneId,
  name: 'Luke',
  email: 'luke@testing.com',
  password: 'usetheforce',
  tokens: [
    {
      token: jwt.sign({ _id: userOneId.toString() }, process.env.JWT_SECRET, {
        expiresIn: '24h',
      }),
    },
  ],
  balance: [
    {
      symbol: 'USD',
      quantity: 100.0,
    },
    {
      symbol: 'ETH',
      quantity: 2.0,
    },
    {
      symbol: 'BTC',
      quantity: 0.15,
    },
  ],
};

const userTwoId = new mongoose.Types.ObjectId();
const userTwo = {
  _id: userTwoId,
  name: 'HanSolo',
  email: 'han@testing.com',
  password: 'handyhan',
  tokens: [
    {
      token: jwt.sign({ _id: userOneId.toString() }, process.env.JWT_SECRET, {
        expiresIn: '24h',
      }),
    },
  ],
  balance: [
    {
      symbol: 'USD',
      quantity: 50.0,
    },
    {
      symbol: 'ETH',
      quantity: 0.8,
    },
    {
      symbol: 'BTC',
      quantity: 0.35,
    },
  ],
};

const tradeOne = {
  owner: userOneId,
  tradeDate: '20-02-21',
  symbol: 'ETH',
  quantity: 0.5,
  cost: 800,
};

const tradeTwo = {
  owner: userOneId,
  tradeDate: '10-01-21',
  symbol: 'BTC',
  quantity: 0.1,
  cost: 3000,
};

const tradeThree = {
  owner: userOneId,
  tradeDate: '30-03-21',
  symbol: 'ADA',
  quantity: 200,
  cost: 240,
};

const tradeFour = {
  owner: userTwoId,
  tradeDate: '10-01-21',
  symbol: 'DOT',
  quantity: 20,
  cost: 300,
};

const setupDatabase = async () => {
  await User.deleteMany();
  await Trade.deleteMany();
  await new User(userOne).save();
  await new User(userTwo).save();
  await new Trade(tradeOne).save();
  await new Trade(tradeTwo).save();
  await new Trade(tradeThree).save();
  await new Trade(tradeFour).save();
};

module.exports = {
  userOneId,
  userOne,
  userTwo,
  userTwoId,
  setupDatabase,
};
