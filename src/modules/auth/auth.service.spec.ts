/* eslint-disable @typescript-eslint/unbound-method */
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { v4 } from 'uuid';

jest.mock('bcrypt', () => ({
  compare: jest.fn().mockImplementation(() => Promise.resolve(true)),
  hash: jest.fn().mockImplementation(() => Promise.resolve('hashedPassword')),
}));

describe('AuthService', () => {
  let authService: AuthService;
  let userService: UserService;
  let jwtService: JwtService;
  let createdUserId: string;

  beforeEach(async () => {
    createdUserId = v4();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UserService,
          useValue: {
            create: jest.fn(),
            findOne: jest.fn().mockResolvedValue({
              id: createdUserId,
              email: 'test@example.com',
              password: '$2b$10$hashedpassword',
              username: 'testuser',
            }),
            findById: jest.fn(),
            findByAll: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn().mockReturnValue('jwt-token'),
          },
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    userService = module.get<UserService>(UserService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
    expect(userService).toBeDefined();
    expect(jwtService).toBeDefined();
  });

  describe('register', () => {
    it('should register a user and return the user object', async () => {
      const userData = {
        username: 'ade',
        email: 'test@example.com',
        password: 'password123',
      };
      const createdUser = {
        id: createdUserId,
        email: userData.email,
        username: userData.username,
      };

      (userService.create as jest.Mock).mockResolvedValue(createdUser);

      const result = await authService.register(userData);
      console.log({ result });

      expect(userService.create).toHaveBeenCalledWith(userData);
      // expect(result).toH;
    });
  });

  describe('login', () => {
    it('should return access token when credentials are valid', async () => {
      const loginData = { email: 'test@example.com', password: 'password123' };

      const result = await authService.login(loginData);

      expect(userService.findOne).toHaveBeenCalledWith(loginData.email);
      expect(result).toEqual({ accessToken: 'jwt-token' });
    });
  });
});
