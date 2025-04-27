// /* eslint-disable @typescript-eslint/no-unsafe-call */
// /* eslint-disable @typescript-eslint/no-unsafe-member-access */
// /* eslint-disable @typescript-eslint/no-unsafe-assignment */
// import { Test, TestingModule } from '@nestjs/testing';
// import { ProductInventoryService } from './product-inventory.service';
// import { getModelToken } from '@nestjs/mongoose';
// import { Product } from '../entities/product.entity';
// import { v4 } from 'uuid';
// import { EmailService } from '../mail.service';
// import { Model } from 'mongoose';

// type MockProductDocument = Product & {
//   save: jest.Mock<Promise<MockProductDocument>>;
// };

// type MockEmailService = jest.Mocked<EmailService> & {
// };

// type MockProductModel = Model<Product> & {
//   new (data?: Partial<Product>): MockProductDocument;
//   find: jest.Mock;
//   findById: jest.Mock;
//   findOne: jest.Mock;
//   create: jest.Mock;
// };

// describe('ProductInventoryService', () => {
//   let service: ProductInventoryService;
//   let mockProductRepo: MockProductModel;
//   let mockEmailService: jest.Mocked<EmailService>;
//   const userId = 'b265ca9d-bdd2-4526-88f5-4470b4d20a42';
//   const category = '0ce71ae2-c45b-4098-afa2-43b5cc102414';

//   beforeEach(async () => {
//     mockProductRepo = function (data: Partial<Product>): MockProductDocument {
//       return {
//         ...(data as Product),
//         save: jest.fn().mockImplementation(function () {
//           return Promise.resolve(this);
//         }),
//       };
//     } as unknown as MockProductModel;
//     mockProductRepo.find = jest.fn();
//     mockProductRepo.findById = jest.fn();
//     mockProductRepo.findOne = jest.fn();
//     mockProductRepo.create = jest.fn();

//     mockEmailService = {
//       sendEmail: jest.fn().mockResolvedValue(true),
//     };
//     const module: TestingModule = await Test.createTestingModule({
//       providers: [
//         ProductInventoryService,
//         {
//           provide: getModelToken(Product.name),
//           useValue: mockProductRepo,
//         },
//         {
//           provide: EmailService,
//           useValue: mockEmailService,
//         },
//       ],
//     }).compile();

//     service = module.get<ProductInventoryService>(ProductInventoryService);
//   });

//   it('should be defined', () => {
//     expect(service).toBeDefined();
//   });

//   describe('findAll', () => {
//     it('should return an array of products', async () => {
//       const expectedProducts = [{ name: 'Tomato' }, { name: 'Potato' }];
//       const mockQuery = {
//         lean: jest.fn().mockReturnThis(),
//         populate: jest.fn().mockResolvedValue(expectedProducts),
//       };
//       mockProductRepo.find.mockReturnValueOnce(mockQuery);

//       const products = await service.findAll({});
//       expect(products).toEqual(expectedProducts);
//       expect(mockProductRepo.find).toHaveBeenCalled();
//     });
//   });

//   describe('findById', () => {
//     it('should return a single product by id', async () => {
//       const id = 'test-id';
//       const expectedProduct = { name: 'Tomato', id };
//       mockProductRepo.findById.mockReturnValueOnce({
//         exec: jest.fn().mockResolvedValueOnce(expectedProduct),
//       });

//       const product = await service.findOne(id);
//       console.log({ product });
//       // expect(product).toEqual(expectedProduct);
//       expect(mockProductRepo.findById).toHaveBeenCalledWith(id);
//     });
//   });

//   describe('addProduct', () => {
//     it('should create a new product', async () => {
//       const productData = {
//         name: 'Carrot',
//         quantity: 100,
//         category,
//         tags: ['fruit'],
//       };
//       const saveMock = jest.fn().mockResolvedValue({
//         ...productData,
//         id: v4(),
//         createdBy: userId,
//       });

//       mockProductRepo.create.mockImplementation((data: any) => ({
//         ...data,
//         save: saveMock,
//       }));

//       const result = await service.addProduct(productData as any, userId);
//       console.log({ result });
//       // expect(result).toEqual(savedProduct);
//       expect(mockProductRepo.create).toHaveBeenCalledWith({
//         ...productData,
//         createdBy: userId,
//       });
//       expect(saveMock).toHaveBeenCalled();
//       // expect(result).toEqual(expect.objectContaining({
//       //   ...productData,
//       //   createdBy: userId
//       // }));
//     });
//   });

//   describe('notifyLowStockUsers', () => {
//     it('should return low stock products', async () => {
//       const lowStockProducts = [
//         {
//           _id: 'product123',
//           name: 'Onion',
//           quantity: 2,
//           lowStockThreshold: 5,
//           createdBy: {
//             _id: 'user123',
//             email: 'ade@gmail.com',
//           },
//         },
//       ];

//       const mockQuery = {
//         lean: jest.fn().mockReturnThis(),
//         populate: jest.fn().mockResolvedValue(lowStockProducts),
//       };
//       mockProductModel.find.mockReturnValue(mockQuery);

//       await service.notifyLowStockUsers();

//       expect(mockProductModel.find).toHaveBeenCalledWith({
//         $expr: { $lt: ['$quantity', '$lowStockThreshold'] },
//       });
//       expect(mockQuery.lean).toHaveBeenCalled();
//       expect(mockQuery.populate).toHaveBeenCalledWith('createdBy');
//     });
//   });
// });

// // First, create a proper mock type for EmailService
// type MockEmailService = jest.Mocked<EmailService> & {
//   // Add any additional methods if needed
// };

// describe('ProductInventoryService', () => {
//   let service: ProductInventoryService;
//   let mockProductRepo: MockProductModel;
//   let mockEmailService: MockEmailService;

//   beforeEach(async () => {
//     // ... other mock setup ...

//     // Create a complete mock of EmailService
//     mockEmailService = {
//       sendEmail: jest.fn().mockResolvedValue(true),
//       sendLowStockNotification: jest.fn().mockResolvedValue(true),
//       // Mock all required properties from EmailService
//       logger: {
//         log: jest.fn(),
//         error: jest.fn(),
//         warn: jest.fn(),
//         debug: jest.fn(),
//         verbose: jest.fn(),
//       },
//       mailService: {
//         sendMail: jest.fn(),
//       },
//       configService: {
//         get: jest.fn(),
//       },
//       // Add any other required properties from EmailService
//     } as MockEmailService;

//     const module: TestingModule = await Test.createTestingModule({
//       providers: [
//         ProductInventoryService,
//         {
//           provide: getModelToken(Product.name),
//           useValue: mockProductRepo,
//         },
//         {
//           provide: EmailService,
//           useValue: mockEmailService,
//         },
//       ],
//     }).compile();

//     service = module.get<ProductInventoryService>(ProductInventoryService);
//   });

//   // ... your tests ...
// });
