import request from 'supertest';
import app from '../src/index'; // Ensure your app is exported from index.ts

describe('API Endpoints', () => {
  let token: string;

  it('should authenticate successfully with valid mobile number', async () => {
    const response = await request(app)
      .post('/authenticate')
      .send({ mobileNumber: '9573631518' });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
    token = response.body.token; // Save token for further tests
  });

  it('should fail authentication with invalid mobile number', async () => {
    const response = await request(app)
      .post('/authenticate')
      .send({ mobileNumber: '1234567890' });

    expect(response.status).toBe(401);
    expect(response.body.message).toBe('Invalid mobile number');
  });

  it('should access protected route with valid token', async () => {
    const response = await request(app)
      .get('/protected')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.text).toBe('This is a protected route');
  });

  it('should deny access to protected route without token', async () => {
    const response = await request(app).get('/protected');

    expect(response.status).toBe(401);
    expect(response.text).toBe('Access Denied');
  });

  it('should deny access to protected route with invalid token', async () => {
    const response = await request(app)
      .get('/protected')
      .set('Authorization', 'Bearer invalid_token');

    expect(response.status).toBe(403);
    expect(response.text).toBe('Invalid Token');
  });
});
