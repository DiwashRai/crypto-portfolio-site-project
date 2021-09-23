const request = require('supertest');
const app = require('../src/app');

test('RefreshToken route should exist', async () => {
  await request(app).post('/auth/token/refresh').send().expect(200);
});
