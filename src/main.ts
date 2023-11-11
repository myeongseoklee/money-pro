import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './util/http-exception.filter';
import {
  BadRequestException,
  ClassSerializerInterceptor,
  Logger,
  ValidationPipe,
} from '@nestjs/common';
import * as basicAuth from 'express-basic-auth';
import { CustomLogger } from './common/logger/custom.logger';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationError } from 'class-validator';
import morgan from 'morgan';
import appConfig from './config/appConfig';
import { ConfigType } from '@nestjs/config';
import { SwaggerSetup } from './common/swagger/swagger';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const config = app.get<ConfigType<typeof appConfig>>(appConfig.KEY);
  const logger = app.get(CustomLogger);

  app.useLogger(logger);
  app.use(morgan('combined'));

  app
    .useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        validationError: { target: true, value: true },
        exceptionFactory: (validationErrors: ValidationError[]): unknown => {
          return new BadRequestException(`${validationErrors}}`);
        },
      }),
    )
    .useGlobalFilters(new HttpExceptionFilter(logger))
    .useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)))
    .enableCors({
      origin: config.corsOrigin,
      methods: ['GET', 'POST', 'DELETE', 'PUT', 'PATCH', 'OPTIONS'],
      allowedHeaders: 'Content-Type, Accept, Authorization',
    });

  // dev server & local server Swagger 연결
  if (config.nodeEnv !== 'production') {
    app.use(
      ['/api-docs'],
      basicAuth({
        users: {
          [config.swagger.user]: `${config.swagger.password}`,
        },
        challenge: true,
      }),
    );
    new SwaggerSetup(app).setup();
  }

  const PORT = config.port;
  await app.listen(PORT);
}
bootstrap();
