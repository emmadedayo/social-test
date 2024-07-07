import request from 'supertest';

import app from '@src/app';

describe('GET /api/v1', () => {
  it('responds with a json message', (done) => {
    request(app).get('/api/v1/health-checker').set('Accept', 'application/json').expect('Content-Type', /json/).expect(
      200,
      { success: false, message: 'Welcome to the Backend Engineer Assessment for a Social Media API—a challenge to design and build a scalable, resilient backend API for a vibrant social media platform.', status: 200 },
      done
    );
  });
});
