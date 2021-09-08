const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('../../src/models/UserModel');
const Trade = require('../../src/models/TradeModel');

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
  currencyBalance: [
    {
      currencySymbol: 'usd',
      quantity: -4040,
    },
  ],
  coinBalance: [
    {
      coinId: 'cardano',
      quantity: 200,
    },
    {
      coinId: 'bitcoin',
      quantity: 0.1,
    },
    {
      coinId: 'ethereum',
      quantity: 0.5,
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
      token: jwt.sign({ _id: userTwoId.toString() }, process.env.JWT_SECRET, {
        expiresIn: '24h',
      }),
    },
  ],
  currencyBalance: [
    {
      currencySymbol: 'usd',
      quantity: -300,
    },
  ],
  coinBalance: [
    {
      coinId: 'polkadot',
      quantity: 300,
    },
  ],
};

const userThreeId = new mongoose.Types.ObjectId();
const userThree = {
  _id: userThreeId,
  name: 'Leia',
  email: 'leia@testing.com',
  password: 'princess',
  tokens: [
    {
      token: jwt.sign({ _id: userThreeId.toString() }, process.env.JWT_SECRET, {
        expiresIn: '24h',
      }),
    },
  ],
  coinBalance: [],
};

const tradeOneId = new mongoose.Types.ObjectId();
const tradeOne = {
  _id: tradeOneId,
  owner: userOneId,
  tradeDate: '20-02-21',
  coinId: 'ethereum',
  quantity: 0.5,
  cost: 800,
};

const tradeTwoId = new mongoose.Types.ObjectId();
const tradeTwo = {
  _id: tradeTwoId,
  owner: userOneId,
  tradeDate: '10-01-21',
  coinId: 'bitcoin',
  quantity: 0.1,
  cost: 3000,
};

const tradeThreeId = new mongoose.Types.ObjectId();
const tradeThree = {
  _id: tradeThreeId,
  owner: userOneId,
  tradeDate: '30-03-21',
  coinId: 'cardano',
  quantity: 200,
  cost: 240,
};

const tradeFourId = new mongoose.Types.ObjectId();
const tradeFour = {
  _id: tradeFourId,
  owner: userTwoId,
  tradeDate: '10-01-21',
  coinId: 'polkadot',
  quantity: 20,
  cost: 300,
};

const setupDatabase = async () => {
  await User.deleteMany();
  await Trade.deleteMany();
  await new User(userOne).save();
  await new User(userTwo).save();
  await new User(userThree).save();
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
  userThreeId,
  userThree,
  tradeOneId,
  tradeOne,
  tradeTwoId,
  tradeTwo,
  tradeThreeId,
  tradeThree,
  tradeFourId,
  tradeFour,
  setupDatabase,
};
