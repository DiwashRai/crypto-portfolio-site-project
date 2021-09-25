const jwt = require('jsonwebtoken');
const request = require('supertest');
const app = require('../src/app');
const RefreshTokenModel = require('../src/models/RefreshTokenModel');

const {
  userOneRefreshTokenString,
  userOneId,
  userTwoId,
  setupDatabase,
} = require('./fixtures/test-data');

beforeEach(setupDatabase);

test('Should return access token to request with valid refresh token', async () => {
  const response = await request(app)
    .post('/auth/token/refresh')
    .set('Cookie', [`refreshToken=${userOneRefreshTokenString}`])
    .send()
    .expect(200);

  const { accessToken } = response.body;
  expect(accessToken).toBeDefined();

  const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
  expect(decoded).toBe(userOneId.toString());
});

test('Should reject refresh request with no token', async () => {
  await request(app).post('/auth/token/refresh').send().expect(401);
});

test('Should reject refresh request with unauthorized refresh token', async () => {
  const refreshToken = jwt.sign(userOneId.toString(), 'not the right secret');
  await request(app)
    .post('/auth/token/refresh')
    .set('Cookie', [`refreshToken=${refreshToken}`])
    .send()
    .expect(401);
});

test('Should reject refresh request for if refresh token is not in database', async () => {
  const refreshToken = jwt.sign(
    userTwoId.toString(),
    process.env.REFRESH_TOKEN_SECRET
  );
  await request(app)
    .post('/auth/token/refresh')
    .set('cookie', [`refreshToken=${refreshToken}`])
    .send()
    .expect(401);
});

test('Should revoke token', async () => {
  // Assert that the refresh token is in the database
  let refreshToken = await RefreshTokenModel.findOne({
    token: userOneRefreshTokenString,
  });
  expect(refreshToken).not.toBeNull();

  const response = await request(app)
    .delete('/auth/token/revoke')
    .set('cookie', [`refreshToken=${userOneRefreshTokenString}`])
    .send()
    .expect(200);

  // Assert that the refresh token gets deleted from the database
  refreshToken = await RefreshTokenModel.findOne({
    token: userOneRefreshTokenString,
  });
  expect(refreshToken).toBeNull();

  // Assert that the response tells browser to clear cookie
  const setCookie = response.header['set-cookie'][0];
  expect(setCookie).toBeDefined();
  expect(setCookie).toMatch(
    'refreshToken=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT'
  );
});
