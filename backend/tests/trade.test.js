const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../src/app');
const Trade = require('../src/models/TradeModel');
const User = require('../src/models/UserModel');
const { userOneId, userOne, setupDatabase } = require('./fixtures/test-data');

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
  const bookedTrade = await Trade.findById(tradeId);
  expect(bookedTrade.owner).toEqual(userOneId);

  // assert that the user can be correctly populated with the id
  await bookedTrade.populate('owner').execPopulate();
  const tradeOwner = await User.findById(userOneId);
  expect(bookedTrade.owner.toJSON()).toEqual(tradeOwner.toJSON());
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
