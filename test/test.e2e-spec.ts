/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let createdProductId: string;
  let createdCategoryId: string;
  let authToken: string;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    const loginResponse = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: 'betty1@gmail.com',
        password: '123456',
      })
      .expect(200);

    console.log({ loginResponse });
    authToken = loginResponse.body.accessToken;
  });

  // -------------- AuthController Tests --------------
  it('/auth/login (POST) - should login successfully and return a token', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: 'betty1@gmail.com',
        password: '123456',
      })
      .expect(200);

    expect(response.body).toHaveProperty('accessToken');
    expect(typeof response.body.accessToken).toBe('string');
  });

  it('/auth/login (POST) - should fail for invalid credentials', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: 'invalid@example.com',
        password: 'wrongpassword',
      })
      .expect(401);

    expect(response.body.message).toBe('Invalid credentials');
  });

  // -------------- CategoryController Tests --------------
  it('/categories (POST) - should create a new category', async () => {
    const createCategoryDto = {
      name: 'Electronics',
      description: 'Category for electronic items',
    };

    const response = await request(app.getHttpServer())
      .post('/categories')
      .set('Authorization', `Bearer ${authToken}`)
      .send(createCategoryDto)
      .expect(201);

    expect(response.body).toHaveProperty('_id');
    createdCategoryId = response.body._id;
    expect(response.body.name).toBe(createCategoryDto.name);
    expect(response.body.description).toBe(createCategoryDto.description);
  });

  //  Fetch all categories
  it('/categories (GET) - should fetch all categories', async () => {
    const response = await request(app.getHttpServer())
      .get('/categories')
      .set('Authorization', `Bearer ${authToken}`)
      .expect(200);

    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
  });

  // Fetch category by ID
  it('/categories/:id (GET) - should fetch a category by ID', async () => {
    const response = await request(app.getHttpServer())
      .get(`/categories/${createdCategoryId}`)
      .set('Authorization', `Bearer ${authToken}`)
      .expect(200);

    expect(response.body).toHaveProperty('_id', createdCategoryId);
    expect(response.body.name).toBe('Electronics');
  });

  // -------------- ProductController Tests --------------
  //  Add Product
  it('/products (POST) - should add a new product', async () => {
    const createProductDto = {
      name: 'New Product',
      description: 'Description of the new product',
      quantity: 10,
      lowStockThreshold: 5,
      category: createdCategoryId,
      tags: ['meat', 'cars'],
    };

    const response = await request(app.getHttpServer())
      .post('/products')
      .set('Authorization', `Bearer ${authToken}`)
      .send(createProductDto)
      .expect(201);

    expect(response.body).toHaveProperty('_id');
    createdProductId = response.body._id;
    expect(response.body.name).toBe(createProductDto.name);
  });

  // Fetch all products
  it('/products (GET) - should fetch all products', async () => {
    const response = await request(app.getHttpServer())
      .get('/products')
      .set('Authorization', `Bearer ${authToken}`)
      .expect(200);

    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
  });

  // Fetch product by ID
  it('/products/:id (GET) - should fetch a product by ID', async () => {
    const response = await request(app.getHttpServer())
      .get(`/products/${createdProductId}`)
      .set('Authorization', `Bearer ${authToken}`)
      .expect(200);

    expect(response.body).toHaveProperty('_id', createdProductId);
    expect(response.body.name).toBe('New Product');
  });
});
