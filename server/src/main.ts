import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger } from '@nestjs/common';
import { initializeTransactionalContext } from 'typeorm-transactional';
import * as cookieParser from 'cookie-parser';

import { AppModule } from './app.module';
import { GlobalExceptionFilter } from './common/filters/global-exception.filter';
import { ValidationPipe } from './common/pipes/validation.pipe';
import { NestExpressApplication } from '@nestjs/platform-express';
import { Request } from 'express';

async function bootstrap() {
  initializeTransactionalContext();

  const corsOptionsDelegate = async (req: Request, callback) => {
    const origin =
      process.env.IS_ALLOW_ALL_ORIGINS === 'true'
        ? req.get('origin')
        : process.env.FRONTEND_URL.slice(0, -1);

    callback(null, { origin, credentials: true });
  };

  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    abortOnError: true,
    cors: corsOptionsDelegate,
  });

  app.use(cookieParser());

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

  await app.listen(process.env.PORT);

  const url = await app.getUrl();
  Logger.log(`Application is running on: ${url}${globalPrefix}`);
  Logger.log(`Swagger path: ${url}${swaggerPath}`);
}
bootstrap();
