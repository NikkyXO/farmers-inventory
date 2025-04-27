import { Test, TestingModule } from '@nestjs/testing';
import { ProductInventoryController } from './product-inventory.controller';
import { ProductInventoryService } from '../services/product-inventory.service';

describe('ProductInventoryController', () => {
  let controller: ProductInventoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductInventoryController],
      providers: [ProductInventoryService],
    }).compile();

    controller = module.get<ProductInventoryController>(
      ProductInventoryController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
