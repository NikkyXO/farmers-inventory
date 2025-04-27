import { Module } from '@nestjs/common';
import { ProductInventoryService } from './services/product-inventory.service';
import { ProductInventoryController } from './controllers/product-inventory.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from './entities/product.entity';
import { Category, CategorySchema } from './entities/category.entity';
import { CategoryController } from './controllers/category.controller';
import { CategoryService } from './services/category.service';
import { EmailService } from './mail.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User, UserSchema } from '../user/entities/user.entity';

@Module({
  imports: [
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        transport: {
          host: configService.get<string>('emailHost'),
          secure: false,
          auth: {
            user: configService.get<string>('emailUsername'),
            pass: configService.get<string>('emailPassword'),
          },
          debug: true,
        },
      }),
    }),
    MongooseModule.forFeature([
      {
        name: Product.name,
        schema: ProductSchema,
      },
      {
        name: Category.name,
        schema: CategorySchema,
      },
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
  ],
  controllers: [ProductInventoryController, CategoryController],
  providers: [ProductInventoryService, CategoryService, EmailService],
})
export class ProductInventoryModule {}
