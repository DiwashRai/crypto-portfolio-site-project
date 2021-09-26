const jwt = require('jsonwebtoken');
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

  // Assert that the response contains the correct user details
  const { user: userData, auth } = response.body;
  expect(userData).toMatchObject({
    name: 'Vader',
    email: 'vader@deathstar.com',
  });

  // Assert that the response contains a valid accessToken
  expect(auth).toBeDefined();
  const { accessToken } = auth;
  const decodedAccessToken = jwt.verify(
    accessToken,
    process.env.ACCESS_TOKEN_SECRET
  );
  expect(decodedAccessToken._id).toMatch(userId.toString());

  // Assert that the password is not stored without hashing
  expect(user.password).not.toBe('iamyourfather');

  // Assert refresh token is set in cookie
  const setCookie = response.header['set-cookie'][0];
  expect(setCookie).toBeDefined();
  const cookie = setCookie.substr(0, setCookie.indexOf(';')).split('=');
  expect(cookie[0]).toMatch('refreshToken');

  // Assert refresh token decodes to correct user id
  const decodedRefreshToken = jwt.verify(
    cookie[1],
    process.env.REFRESH_TOKEN_SECRET
  );
  expect(decodedRefreshToken).toMatch(userId.toString());
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
  const { user: userData, auth } = response.body;

  // Assert password is removed from response
  expect(userData.password).toBeFalsy();

  // Assert auth object is returned and contains accessToken
  expect(auth).toBeDefined();
  const { accessToken } = response.body.auth;
  const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
  expect(decoded._id).toMatch(userOneId.toString());

  // Assert refresh token is set in cookie
  const setCookie = response.header['set-cookie'][0];
  expect(setCookie).toBeDefined();
  const cookie = setCookie.substr(0, setCookie.indexOf(';')).split('=');
  expect(cookie[0]).toMatch('refreshToken');

  // Assert refresh token decodes to correct user id
  const decodedRefreshToken = jwt.verify(
    cookie[1],
    process.env.REFRESH_TOKEN_SECRET
  );
  expect(decodedRefreshToken).toMatch(userOneId.toString());
});

test('Should return the authorized users correct details', async () => {
  const userOneAccessToken = jwt.sign(
    { _id: userOneId.toString() },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: '15m' }
  );
  const response = await request(app)
    .get('/users/me')
    .set('Authorization', `Bearer ${userOneAccessToken}`)
    .send()
    .expect(200);

  expect(response.body).toMatchObject({
    _id: userOneId.toHexString(),
    name: userOne.name,
    email: userOne.email,
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
  });
});

test('/users patch route', async () => {
  await request(app).patch('/users/me').expect(200);
});

test('/users delete route', async () => {
  await request(app).delete('/users/me').expect(200);
});
