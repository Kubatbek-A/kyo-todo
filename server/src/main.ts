import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger } from '@nestjs/common';
import { initializeTransactionalContext } from 'typeorm-transactional';

import { AppModule } from './app.module';
import { GlobalExceptionFilter } from './common/filters/global-exception.filter';
import { ValidationPipe } from './common/pipes/validation.pipe';

async function bootstrap() {
  initializeTransactionalContext();

  const app = await NestFactory.create(AppModule, {
    abortOnError: true,
  });

  const globalPrefix = '/api';

  app.setGlobalPrefix(globalPrefix);

  const swaggerPath = `${globalPrefix}/swagger`;
  const swaggerDocs = new DocumentBuilder()
    .setTitle('Calamigos API')
    .setDescription('Description')
    .setVersion('3.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, swaggerDocs);
  SwaggerModule.setup(swaggerPath, app, document);

  app.useGlobalFilters(new GlobalExceptionFilter());
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();

  await app.listen(process.env.PORT);

  const url = await app.getUrl();
  Logger.log(`Application is running on: ${url}${globalPrefix}`);
  Logger.log(`Swagger path: ${url}${swaggerPath}`);
}
bootstrap();
