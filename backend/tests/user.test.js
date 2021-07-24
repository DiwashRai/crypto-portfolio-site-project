const request = require('supertest');
const app = require('../src/app');

test('/users route should be exposed', async () => {
  const response = await request(app).post('/users').expect(200);
});
