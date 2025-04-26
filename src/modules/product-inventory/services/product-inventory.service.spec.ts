import { Test, TestingModule } from '@nestjs/testing';
import { ProductInventoryService } from './product-inventory.service';

describe('ProductInventoryService', () => {
  let service: ProductInventoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductInventoryService],
    }).compile();

    service = module.get<ProductInventoryService>(ProductInventoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
