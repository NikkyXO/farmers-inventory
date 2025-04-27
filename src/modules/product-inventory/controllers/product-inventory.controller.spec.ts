import { Test, TestingModule } from '@nestjs/testing';
import { ProductInventoryController } from './product-inventory.controller';
import { ProductInventoryService } from '../services/product-inventory.service';
import { EmailService } from '../mail.service';
import { getModelToken } from '@nestjs/mongoose';
import { Product } from '../entities/product.entity';

describe('ProductInventoryController', () => {
  let controller: ProductInventoryController;
  let service: ProductInventoryService;

  beforeEach(async () => {
    const mockProductModel = {
      find: jest.fn(),
      findById: jest.fn(),
      create: jest.fn(),
      save: jest.fn(),
    };
    const mockEmailService = {
      sendEmail: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductInventoryController],
      providers: [
        ProductInventoryService,
        {
          provide: getModelToken(Product.name),
          useValue: mockProductModel,
        },
        {
          provide: EmailService,
          useValue: mockEmailService,
        },
      ],
    }).compile();

    controller = module.get<ProductInventoryController>(
      ProductInventoryController,
    );
    service = module.get<ProductInventoryService>(ProductInventoryService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });
});
