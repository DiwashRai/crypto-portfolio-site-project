const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../src/app');
const User = require('../src/models/UserModel');
const { userOneId, userOne, setupDatabase } = require('./fixtures/test-data');

beforeEach(setupDatabase);

test('Should sign up new user', async () => {
  const userId = new mongoose.Types.ObjectId();
  const response = await request(app)
    .post('/users')
    .send({
      _id: userId,
      name: 'Vader',
      email: 'vader@deathstar.com',
      password: 'iamyourfather',
    })
    .expect(201);

  // Assert that the user was added to database correctly
  const user = await User.findById(userId);
  expect(user).not.toBeNull();

  // Assert that the response contains the correct user details and a token
  expect(response.body).toMatchObject({
    user: {
      name: 'Vader',
      email: 'vader@deathstar.com',
    },
    token: user.tokens[0].token,
  });

  // Assert that the password is not stored without hashing
  expect(user.password).not.toBe('iamyourfather');
});

test('Should reject sign up with an email that is already in use', async () => {
  await request(app)
    .post('/users')
    .send({
      name: 'NotHan',
      email: 'han@testing.com',
      password: 'notTheSame',
    })
    .expect(400);
});

test('Should login successfully with correct credentials', async () => {
  const response = await request(app)
    .post('/users/login')
    .send({
      email: userOne.email,
      password: userOne.password,
    })
    .expect(200);

  // make sure password is removed from response
  expect(response.body.password).toBeFalsy();

  // check the jwt token is created and sent in the response
  const user = await User.findById(userOneId);
  expect(response.body.token).toBe(user.tokens[1].token);
});

test('Should logout currently logged in user', async () => {
  const response = await request(app)
    .post('/users/logout')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);
});

test('/users/me get route', async () => {
  const response = await request(app)
    .get('/users/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);

  expect(response.body).toMatchObject({
    _id: userOneId.toHexString(),
    name: userOne.name,
    email: userOne.email,
    balance: [
      {
        symbol: 'USD',
        quantity: 100,
      },
      {
        symbol: 'ETH',
        quantity: 2,
      },
      {
        symbol: 'BTC',
        quantity: 0.15,
      },
    ],
  });
});

test('/users patch route', async () => {
  const response = await request(app).patch('/users/me').expect(200);
});

test('/users delete route', async () => {
  const response = await request(app).delete('/users/me').expect(200);
});
