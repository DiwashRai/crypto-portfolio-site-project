const jwt = require('jsonwebtoken');
const request = require('supertest');
const app = require('../src/app');
const { userOneId, setupDatabase } = require('./fixtures/test-data');

beforeEach(setupDatabase);

test('Should reject refresh request with unauthorized refresh token', async () => {
  const refreshToken = jwt.sign(userOneId.toString(), 'not the right secret');
  await request(app)
    .post('/auth/token/refresh')
    .set('Cookie', [`refreshToken=${refreshToken}`])
    .send()
    .expect(401);
});

test('Should return access token to request with valid refresh token', async () => {
  const refreshToken = jwt.sign(
    userOneId.toString(),
    process.env.REFRESH_TOKEN_SECRET
  );
  const response = await request(app)
    .post('/auth/token/refresh')
    .set('Cookie', [`refreshToken=${refreshToken}`])
    .send()
    .expect(200);
});
