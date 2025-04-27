import { expect } from '@jest/globals';
import { request } from 'src/config/setup';
import { v4 as uuidv4 } from 'uuid';

describe('Items Integration Tests', () => {
  let token: string;
  let itemId: string;
  const testItemIds: string[] = [];
  const uniqueUsername = `User-${uuidv4()}`;

  beforeAll(async () => {
    jest.setTimeout(10000);
    // Register user
    const registerResponse = await request
      .post('/auth/signup')
      .send({ username: uniqueUsername, password: 'validPassword' });

    expect(registerResponse.status).toBe(201);
    expect(registerResponse.body).toHaveProperty('id');

    // Log in user
    const loginResponse = await request
      .post('/auth/login')
      .send({ username: uniqueUsername, password: 'validPassword' });

    token = loginResponse.body.accessToken;
  });
  it('should create a new item', async () => {
    const newName = `Test Item ${uuidv4()}`;
    const newDescription = `Item description for testing`;
    const response = await request
      .post('/items')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: newName, description: newDescription });

    itemId = response.body.id;
    testItemIds.push(itemId);
    expect(response.status).toBe(201);
    expect(response.body.name).toBe(newName);
    expect(response.body.description).toBe(newDescription);
    expect(response.body).toHaveProperty('user');
  });

  it('should fetch all items', async () => {
    const response = await request
      .get('/items')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it('should fetch a specific item', async () => {
    const response = await request
      .get(`/items/${itemId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.id).toBe(itemId);
  });

  it('should fetch an item with creator details', async () => {
    const response = await request
      .get(`/items/${itemId}?join=user`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.id).toBe(itemId);
    expect(response.body.user.username).toBe(uniqueUsername);
  });

  it('should update an item', async () => {
    const newName = 'Updated Item';
    const newDescription = 'Updated Item description';
    const response = await request
      .patch(`/items/${itemId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ name: newName, description: newDescription });

    expect(response.status).toBe(200);
    expect(response.body.name).toBe(newName);
    expect(response.body.description).toBe(newDescription);
  });

  it('should delete an item', async () => {
    const response = await request
      .delete(`/items/${itemId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
  });
});
