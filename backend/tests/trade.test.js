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
  tradeOneId,
  tradeTwoId,
  tradeThreeId,
  tradeFourId,
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
  let response = await request(app)
    .post('/trades')
    .set('Authorization', `Bearer ${userThree.tokens[0].token}`)
    .send({
      tradeDate: 'testdate',
      symbol: 'ETH',
      quantity: 1.5,
      cost: 2700,
    })
    .expect(201);

  let user = await UserModel.findById(userThreeId);
  const ETHBalance = user.balance.find((element) => element.symbol === 'ETH');
  let USDBalance = user.balance.find((element) => element.symbol === 'USD');
  expect(ETHBalance.quantity).toBe(1.5);
  expect(USDBalance.quantity).toBe(-2700);

  response = await request(app)
    .post('/trades')
    .set('Authorization', `Bearer ${userThree.tokens[0].token}`)
    .send({
      tradeDate: 'testdate',
      symbol: 'BTC',
      quantity: 0.1,
      cost: 4000,
    })
    .expect(201);

  user = await UserModel.findById(userThreeId);
  const BTCBalance = user.balance.find((element) => element.symbol === 'BTC');
  USDBalance = user.balance.find((element) => element.symbol === 'USD');
  expect(BTCBalance.quantity).toBe(0.1);
  expect(USDBalance.quantity).toBe(-6700);
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
  const updatedSymbol = 'BTC';
  const updatedQuantity = 0.1;
  const updatedFee = 3;
  const response = await request(app)
    .patch(`/trades/${tradeFourId}`)
    .set('Authorization', `Bearer ${userTwo.tokens[0].token}`)
    .send({
      symbol: updatedSymbol,
      quantity: updatedQuantity,
      fee: updatedFee,
    })
    .expect(200);

  expect(response.body).toMatchObject({
    _id: tradeFourId.toHexString(),
    symbol: updatedSymbol,
    quantity: updatedQuantity,
    fee: updatedFee,
  });
});

test('Should update the users balance when trades are updated', async () => {
  const firstTradeId = new mongoose.Types.ObjectId();
  let response = await request(app)
    .post('/trades')
    .set('Authorization', `Bearer ${userThree.tokens[0].token}`)
    .send({
      _id: firstTradeId,
      tradeDate: 'testDate',
      symbol: 'ADA',
      quantity: 200,
      cost: 240,
    })
    .expect(201);

  const secondTradeId = new mongoose.Types.ObjectId();
  response = await request(app)
    .post('/trades')
    .set('Authorization', `Bearer ${userThree.tokens[0].token}`)
    .send({
      _id: secondTradeId,
      tradeDate: 'testDate',
      symbol: 'BTC',
      quantity: 1,
      cost: 40000,
    })
    .expect(201);

  let user = await UserModel.findById(userThreeId);
  let ADABalance = user.balance.find((element) => element.symbol === 'ADA');
  let USDBalance = user.balance.find((element) => element.symbol === 'USD');
  let BTCBalance = user.balance.find((element) => element.symbol === 'BTC');
  expect(ADABalance.quantity).toBe(200);
  expect(USDBalance.quantity).toBe(-40240);
  expect(BTCBalance.quantity).toBe(1);

  response = await request(app)
    .patch(`/trades/${firstTradeId}`)
    .set('Authorization', `Bearer ${userThree.tokens[0].token}`)
    .send({
      quantity: 100,
      fee: 3,
      cost: 120,
    })
    .expect(200);

  user = await UserModel.findById(userThreeId);
  ADABalance = user.balance.find((element) => element.symbol === 'ADA');
  USDBalance = user.balance.find((element) => element.symbol === 'USD');
  expect(ADABalance.quantity).toBe(100);
  expect(USDBalance.quantity).toBe(-40123);

  response = await request(app)
    .patch(`/trades/${secondTradeId}`)
    .set('Authorization', `Bearer ${userThree.tokens[0].token}`)
    .send({
      quantity: 0.5,
      fee: 20,
      cost: 21000,
    })
    .expect(200);

  user = await UserModel.findById(userThreeId);
  BTCBalance = user.balance.find((element) => element.symbol === 'BTC');
  USDBalance = user.balance.find((element) => element.symbol === 'USD');
  expect(BTCBalance.quantity).toBe(0.5);
  expect(USDBalance.quantity).toBe(-21143);
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
    total: trade.total,
    price: trade.price,
  });

  // check that the trade has been deleted from the database
  trade = await TradeModel.findById(tradeFourId);
  expect(trade).toBeNull();
});

test('Deleting trades should update the users balance', async () => {
  let user = await UserModel.findById(userOneId);
  const ETHBalance = user.balance.find((element) => element.symbol === 'ETH');
  const BTCBalance = user.balance.find((element) => element.symbol === 'BTC');
  const ADABalance = user.balance.find((element) => element.symbol === 'ADA');
  const USDBalance = user.balance.find((element) => element.symbol === 'USD');

  let response = await request(app)
    .delete(`/trades/${tradeOneId}`)
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .expect(200);

  user = await UserModel.findById(userOneId);
  let balance = user.balance.find((element) => element.symbol === 'ETH');
  expect(balance.quantity).toBe(ETHBalance.quantity - response.body.quantity);
  balance = user.balance.find((element) => element.symbol === 'USD');
  expect(balance.quantity).toBe(USDBalance.quantity + response.body.total);
  USDBalance.quantity += response.body.total;

  response = await request(app)
    .delete(`/trades/${tradeTwoId}`)
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .expect(200);

  user = await UserModel.findById(userOneId);
  balance = user.balance.find((element) => element.symbol === 'BTC');
  expect(balance.quantity).toBe(BTCBalance.quantity - response.body.quantity);
  balance = user.balance.find((element) => element.symbol === 'USD');
  expect(balance.quantity).toBe(USDBalance.quantity + response.body.total);
  USDBalance.quantity += response.body.total;

  response = await request(app)
    .delete(`/trades/${tradeThreeId}`)
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .expect(200);

  user = await UserModel.findById(userOneId);
  balance = user.balance.find((element) => element.symbol === 'ADA');
  expect(balance.quantity).toBe(ADABalance.quantity - response.body.quantity);
  balance = user.balance.find((element) => element.symbol === 'USD');
  expect(balance.quantity).toBe(USDBalance.quantity + response.body.total);
});
