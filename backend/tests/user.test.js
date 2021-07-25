const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../src/app');
const User = require('../src/models/user');
const { userOne, setupDatabase } = require('./fixtures/test-data');

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
  expect(response.body).toMatchObject({
    name: 'Vader',
    email: 'vader@deathstar.com',
  });

  // Assert that the password is not stored without hashing
  expect(user.password).not.toBe('iamyourfather');
});

test('/users get route', async () => {
  const response = await request(app).get('/users').expect(200);
});

test('/users patch route', async () => {
  const response = await request(app).patch('/users').expect(200);
});

test('/users delete route', async () => {
  const response = await request(app).delete('/users').expect(200);
});
