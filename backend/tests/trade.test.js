const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../src/app');
const TradeModel = require('../src/models/TradeModel');
const UserModel = require('../src/models/UserModel');
const {
  userOneId,
  userOne,
  userThreeId,
  userTwo,
  userThree,

  tradeFourId,
  tradeFour,
  setupDatabase,
} = require('./fixtures/test-data');

beforeEach(setupDatabase);

test('Logged in users should be able to add trades', async () => {
  const tradeId = new mongoose.Types.ObjectId();
  const response = await request(app)
    .post('/trades')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send({
      _id: tradeId.toHexString(),
      tradeDate: 'testdate',
      symbol: 'ETH',
      quantity: 1,
      cost: 1800,
    })
    .expect(201);

  // assert that the id store in the Trade matches the id of userOne
  const bookedTrade = await TradeModel.findById(tradeId);
  expect(bookedTrade.owner).toEqual(userOneId);

  // assert that the user can be correctly populated with the id
  await bookedTrade.populate('owner').execPopulate();
  const tradeOwner = await UserModel.findById(userOneId);
  expect(bookedTrade.owner.toJSON()).toEqual(tradeOwner.toJSON());
});

test('Should update users balance when trade is added', async () => {
  const response = await request(app)
    .post('/trades')
    .set('Authorization', `Bearer ${userThree.tokens[0].token}`)
    .send({
      tradeDate: 'testdate',
      symbol: 'ETH',
      quantity: 1.5,
      cost: 2700,
    })
    .expect(201);

  const user = await UserModel.findById(userThreeId);
  const ETHBalance = user.balance.find((element) => element.symbol === 'ETH');
  const USDBalance = user.balance.find((element) => element.symbol === 'USD');
  expect(ETHBalance.quantity).toBe(1.5);
  expect(USDBalance.quantity).toBe(-2700);
});

test('Should retrieve logged in users trades', async () => {
  const response = await request(app)
    .get('/trades')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .expect(200);

  expect(response.body.length).toEqual(3);
});

test('Should retrieve specific trade by specifying ID', async () => {
  const response = await request(app)
    .get(`/trades/${tradeFourId}`)
    .set('Authorization', `Bearer ${userTwo.tokens[0].token}`)
    .expect(200);

  const trade = await TradeModel.findById(tradeFourId);
  expect(response.body).toMatchObject({
    _id: tradeFourId.toHexString(),
    tradeDate: trade.tradeDate,
    symbol: trade.symbol,
    quantity: trade.quantity,
    cost: trade.cost,
    total: trade.total,
    price: trade.price,
  });
});

test('Should allow authorized user to update trade details', async () => {
  tradeFour.symbol = 'BTC';
  tradeFour.quantity = 0.1;
  tradeFour.fee = 3;
  const response = await request(app)
    .patch(`/trades/${tradeFourId}`)
    .set('Authorization', `Bearer ${userTwo.tokens[0].token}`)
    .send({
      symbol: tradeFour.symbol,
      quantity: tradeFour.quantity,
      fee: tradeFour.fee,
    })
    .expect(200);

  expect(response.body).toMatchObject({
    _id: tradeFourId.toHexString(),
    symbol: tradeFour.symbol,
    quantity: tradeFour.quantity,
    fee: tradeFour.fee,
  });
});

// TODO: add test to make sure fields that are not allowed cannot be updated

test('Should allow user to delete their own trade', async () => {
  // check that the trade exists first
  let trade = await TradeModel.findById(tradeFourId);
  expect(trade).not.toBeNull();

  const response = await request(app)
    .delete(`/trades/${tradeFourId}`)
    .set('Authorization', `Bearer ${userTwo.tokens[0].token}`)
    .expect(200);

  // check that the response body contains correct trade details
  expect(response.body).toMatchObject({
    _id: tradeFourId.toHexString(),
    tradeDate: trade.tradeDate,
    symbol: trade.symbol,
    quantity: trade.quantity,
    cost: trade.cost,
    fee: trade.fee,
    total: trade.total,
    price: trade.price,
  });

  // check that the trade has been deleted from the database
  trade = await TradeModel.findById(tradeFourId);
  expect(trade).toBeNull();
});
