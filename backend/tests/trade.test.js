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
  await request(app)
    .post('/trades')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send({
      _id: tradeId.toHexString(),
      tradeDate: Date.now(),
      coinId: 'ethereum',
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
  await request(app)
    .post('/trades')
    .set('Authorization', `Bearer ${userThree.tokens[0].token}`)
    .send({
      tradeDate: Date.now(),
      coinId: 'ethereum',
      quantity: 1.5,
      cost: 2700,
    })
    .expect(201);

  let user = await UserModel.findById(userThreeId);
  const ethereumBalance = user.coinBalance.find(
    (element) => element.coinId === 'ethereum'
  );
  let USDBalance = user.currencyBalance.find(
    (element) => element.currencySymbol === 'usd'
  );
  expect(ethereumBalance.quantity).toBe(1.5);
  expect(USDBalance.quantity).toBe(-2700);

  await request(app)
    .post('/trades')
    .set('Authorization', `Bearer ${userThree.tokens[0].token}`)
    .send({
      tradeDate: Date.now(),
      coinId: 'bitcoin',
      quantity: 0.1,
      cost: 4000,
    })
    .expect(201);

  user = await UserModel.findById(userThreeId);
  const bitcoinBalance = user.coinBalance.find(
    (element) => element.coinId === 'bitcoin'
  );
  USDBalance = user.currencyBalance.find(
    (element) => element.currencySymbol === 'usd'
  );
  expect(bitcoinBalance.quantity).toBe(0.1);
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
    tradeDate: trade.tradeDate.toISOString(),
    coinId: trade.coinId,
    quantity: trade.quantity,
    cost: trade.cost,
    total: trade.total,
    price: trade.price,
  });
});

test('Should allow authorized user to update trade details', async () => {
  const updatedCoinId = 'bitcoin';
  const updatedQuantity = 0.1;
  const updatedFee = 3;
  const response = await request(app)
    .patch(`/trades/${tradeFourId}`)
    .set('Authorization', `Bearer ${userTwo.tokens[0].token}`)
    .send({
      coinId: updatedCoinId,
      quantity: updatedQuantity,
      fee: updatedFee,
    })
    .expect(200);

  expect(response.body).toMatchObject({
    _id: tradeFourId.toHexString(),
    coinId: updatedCoinId,
    quantity: updatedQuantity,
    fee: updatedFee,
  });
});

test('Should update the users balance when trades are updated', async () => {
  const firstTradeId = new mongoose.Types.ObjectId();
  await request(app)
    .post('/trades')
    .set('Authorization', `Bearer ${userThree.tokens[0].token}`)
    .send({
      _id: firstTradeId,
      tradeDate: Date.now(),
      coinId: 'cardano',
      quantity: 200,
      cost: 240,
    })
    .expect(201);

  const secondTradeId = new mongoose.Types.ObjectId();
  await request(app)
    .post('/trades')
    .set('Authorization', `Bearer ${userThree.tokens[0].token}`)
    .send({
      _id: secondTradeId,
      tradeDate: Date.now(),
      coinId: 'bitcoin',
      quantity: 1,
      cost: 40000,
    })
    .expect(201);

  let user = await UserModel.findById(userThreeId);
  let cardanoBalance = user.coinBalance.find(
    (element) => element.coinId === 'cardano'
  );
  let USDBalance = user.currencyBalance.find(
    (element) => element.currencySymbol === 'usd'
  );
  let bitcoinBalance = user.coinBalance.find(
    (element) => element.coinId === 'bitcoin'
  );
  expect(cardanoBalance.quantity).toBe(200);
  expect(USDBalance.quantity).toBe(-40240);
  expect(bitcoinBalance.quantity).toBe(1);

  await request(app)
    .patch(`/trades/${firstTradeId}`)
    .set('Authorization', `Bearer ${userThree.tokens[0].token}`)
    .send({
      quantity: 100,
      fee: 3,
      cost: 120,
    })
    .expect(200);

  user = await UserModel.findById(userThreeId);
  cardanoBalance = user.coinBalance.find(
    (element) => element.coinId === 'cardano'
  );
  USDBalance = user.currencyBalance.find(
    (element) => element.currencySymbol === 'usd'
  );
  expect(cardanoBalance.quantity).toBe(100);
  expect(USDBalance.quantity).toBe(-40123);

  await request(app)
    .patch(`/trades/${secondTradeId}`)
    .set('Authorization', `Bearer ${userThree.tokens[0].token}`)
    .send({
      quantity: 0.5,
      fee: 20,
      cost: 21000,
    })
    .expect(200);

  user = await UserModel.findById(userThreeId);
  bitcoinBalance = user.coinBalance.find(
    (element) => element.coinId === 'bitcoin'
  );
  USDBalance = user.currencyBalance.find(
    (element) => element.currencySymbol === 'usd'
  );
  expect(bitcoinBalance.quantity).toBe(0.5);
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
    tradeDate: trade.tradeDate.toISOString(),
    coinId: trade.coinId,
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
  const ethereumBalance = user.coinBalance.find(
    (element) => element.coinId === 'ethereum'
  );
  const bitcoinBalance = user.coinBalance.find(
    (element) => element.coinId === 'bitcoin'
  );
  const cardanoBalance = user.coinBalance.find(
    (element) => element.coinId === 'cardano'
  );
  const USDBalance = user.currencyBalance.find(
    (element) => element.currencySymbol === 'usd'
  );

  let response = await request(app)
    .delete(`/trades/${tradeOneId}`)
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .expect(200);

  user = await UserModel.findById(userOneId);
  let balance = user.coinBalance.find(
    (element) => element.coinId === 'ethereum'
  );
  expect(balance.quantity).toBe(
    ethereumBalance.quantity - response.body.quantity
  );
  balance = user.currencyBalance.find(
    (element) => element.currencySymbol === 'usd'
  );
  expect(balance.quantity).toBe(USDBalance.quantity + response.body.total);
  USDBalance.quantity += response.body.total;

  response = await request(app)
    .delete(`/trades/${tradeTwoId}`)
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .expect(200);

  user = await UserModel.findById(userOneId);
  balance = user.coinBalance.find((element) => element.coinId === 'bitcoin');
  expect(balance.quantity).toBe(
    bitcoinBalance.quantity - response.body.quantity
  );
  balance = user.currencyBalance.find(
    (element) => element.currencySymbol === 'usd'
  );
  expect(balance.quantity).toBe(USDBalance.quantity + response.body.total);
  USDBalance.quantity += response.body.total;

  response = await request(app)
    .delete(`/trades/${tradeThreeId}`)
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .expect(200);

  user = await UserModel.findById(userOneId);
  balance = user.coinBalance.find((element) => element.coinId === 'cardano');
  expect(balance.quantity).toBe(
    cardanoBalance.quantity - response.body.quantity
  );
  balance = user.currencyBalance.find(
    (element) => element.currencySymbol === 'usd'
  );
  expect(balance.quantity).toBe(USDBalance.quantity + response.body.total);
});
