const request = require('supertest');
const app = require('../src/app');

test('Unsupported routes should result in 404', async () => {
  const response = await request(app)
    .get('/random')
    .expect({ error: 'Invalid route' })
    .expect(404);
});
