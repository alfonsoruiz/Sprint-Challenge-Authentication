const request = require('supertest');
const server = require('./server');

describe('server.js', () => {
  describe('/api/auth/register', () => {
    it('should return a JSON object from register endpoint', async () => {
      const response = await request(server).post('/api/auth/register');
      expect(response.type).toEqual('application/json');
    });

    it('should return status code 201 on successful registration', async () => {
      const response = await request(server)
        .post('/api/auth/register')
        .send({ username: 'user101', password: 'password' });
      expect(response.status).toEqual(201);
    });
  });

  describe('/api/auth/login', () => {
    it('should return a JSON object from login endpoint', async () => {
      const response = await request(server).post('/api/auth/login');
      expect(response.type).toEqual('application/json');
    });

    it('should add return status code 200 on successful login ', async () => {
      const response = await request(server)
        .post('/api/auth/login')
        .send({ username: 'user5', password: 'password' });

      expect(response.status).toEqual(200);
    });

    it('should return status code of 401 if credentials are invalid', async () => {
      const response = await request(server)
        .post('/api/auth/login')
        .send({ username: 'user1000', password: 'password' });

      expect(response.status).toEqual(401);
    });
  });
});
