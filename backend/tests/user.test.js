const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../src/app');
const User = require('../src/models/user');
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
  expect(response.body).toMatchObject({
    name: 'Vader',
    email: 'vader@deathstar.com',
  });

  // Assert that the password is not stored without hashing
  expect(user.password).not.toBe('iamyourfather');
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

  // TODO: token assert tests when implemented
  const user = User.findById(userOneId);
  expect(response.body.token).toBe(user.tokens[1].token);
});

test('/users/me get route', async () => {
  const response = await request(app).get('/users/me').expect(200);
});

test('/users patch route', async () => {
  const response = await request(app).patch('/users/me').expect(200);
});

test('/users delete route', async () => {
  const response = await request(app).delete('/users/me').expect(200);
});
