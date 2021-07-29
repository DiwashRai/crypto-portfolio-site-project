const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../src/app');
const Trade = require('../src/models/trade');
const { userOneId, userOne, setupDatabase } = require('./fixtures/test-data');

// beforeEach(setupDatabase);

test('/trades post route', async () => {
  const response = await request(app).post('/trades').expect(200);
});

test('/trades get route', async () => {
  const response = await request(app).get('/trades').expect(200);
});

test('/trades patch route', async () => {
  const response = await request(app).patch('/trades').expect(200);
});

test('/trades delete route', async () => {
  const response = await request(app).delete('/trades').expect(200);
});
