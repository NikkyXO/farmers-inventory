import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { expect } from '@jest/globals';
import { validate as isUUID } from 'uuid';
import { AppModule } from 'src/app.module';

describe('Authentication API', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('Authentication', () => {
    const testUser = {
      username: 'testuser',
      password: 'password123',
    };

    it('should register a new user and return UUID', () => {
      return request(app.getHttpServer())
        .post('/auth/signup')
        .send(testUser)
        .expect(201)
        .expect(({ body }) => {
          expect(isUUID(body.id)).toBeTruthy();
          expect(body.username).toBe(testUser.username);
        });
    });

    it('should not register a user with existing username', async () => {
      await request(app.getHttpServer()).post('/auth/signup').send(testUser);

      return request(app.getHttpServer())
        .post('/auth/signup')
        .send(testUser)
        .expect(409);
    });

    it('should login with valid credentials and return JWT', async () => {
      await request(app.getHttpServer()).post('/auth/signup').send(testUser);
      return request(app.getHttpServer())
        .post('/auth/login')
        .send(testUser)
        .expect(200)
        .expect(({ body }) => {
          expect(body.accessToken).toBeDefined();
          expect(typeof body.accessToken).toBe('string');
          expect(body.accessToken.split('.').length).toBe(3);
        });
    });

    it('should not login with invalid credentials', async () => {
      await request(app.getHttpServer()).post('/auth/signup').send(testUser);

      return request(app.getHttpServer())
        .post('/auth/login')
        .send({
          username: testUser.username,
          password: 'wrongpassword',
        })
        .expect(401);
    });
  });
});
