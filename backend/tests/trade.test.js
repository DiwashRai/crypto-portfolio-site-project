const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../src/app');
const TradeModel = require('../src/models/TradeModel');
const UserModel = require('../src/models/UserModel');
const {
  userOneId,
  userOne,
  userThreeId,
  userThree,
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

test('/trades patch route', async () => {
  const response = await request(app).patch('/trades').expect(200);
});

test('/trades delete route', async () => {
  const response = await request(app).delete('/trades').expect(200);
});
