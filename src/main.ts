import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const port = process.env.PORT || 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );
  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('Inventory Service')
    .setDescription('Inventory Service')
    .setVersion('1.0')
    .setContact('Nikky', 'nikky.co', 'developer@nikky.co')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'Authorization',
        description: 'Enter JWT Token',
        in: 'header',
      },
      'JWT',
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(port);
}

bootstrap()
  .then(() => {
    const logger = new Logger('Bootstrap');
    logger.log('Inventory App started');
  })
  .catch((error) => {
    const logger = new Logger('Bootstrap');
    logger.error('Failed to start Inventory App', error);
    process.exit(1);
  });
