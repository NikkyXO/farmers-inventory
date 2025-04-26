import { ConfigModule, ConfigService } from '@nestjs/config';
import { configuration } from './config';
import { AuthModule } from './modules/auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './modules/user/user.module';
import { ProductInventoryModule } from './modules/product-inventory/product-inventory.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      envFilePath: '.env',
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        return {
          uri: configService.get<string>('mongoDBURI'),
        };
      },
      inject: [ConfigService],
    }),
    AuthModule,
    UserModule,
    AuthModule, UserModule, ProductInventoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

// implements OnModuleInit {
//   constructor(private readonly seederService: SeederService) {}
//   async onModuleInit() {
//     await this.seederService.seedUsers();
//     await this.seederService.seedMessages();
//   }
