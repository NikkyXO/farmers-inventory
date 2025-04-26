import { Module } from '@nestjs/common';
import { ProductInventoryService } from './services/product-inventory.service';
import { ProductInventoryController } from './controllers/product-inventory.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from './entities/product.entity';
import { Category, CategorySchema } from './entities/category.entity';
import { CategoryController } from './controllers/category.controller';
import { CategoryService } from './services/category.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Product.name,
        schema: ProductSchema,
      },
      {
        name: Category.name,
        schema: CategorySchema,
      },
    ]),
  ],
  controllers: [ProductInventoryController, CategoryController],
  providers: [ProductInventoryService, CategoryService],
})
export class ProductInventoryModule {}
