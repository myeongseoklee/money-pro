import { INestApplication } from '@nestjs/common';
import {
  SwaggerModule,
  DocumentBuilder,
  SwaggerCustomOptions,
  SwaggerDocumentOptions,
} from '@nestjs/swagger';

/**
 * @author MyeongSeok
 * @description Swagger 세팅
 */
export class SwaggerSetup {
  private app: INestApplication;

  constructor(app: INestApplication) {
    this.app = app;
  }

  setup(): void {
    //웹 페이지를 새로고침을 해도 Token 값 유지
    const swaggerCustomOptions: SwaggerCustomOptions = {
      swaggerOptions: {
        persistAuthorization: true,
        withCredentials: true,
      },
      customSiteTitle: `title`,
    };

    const swaggerConfig = new DocumentBuilder()
      .setTitle('title')
      .setDescription(`description`)
      .setVersion('1.0.0')
      .addTag('api tag')
      //JWT 토큰 설정
      .addBearerAuth(
        {
          type: 'http',
          scheme: 'bearer',
          name: 'authorization',
          in: 'header',
          bearerFormat: 'JWT',
        },
        'accessToken',
      )
      // refresh token
      // .addCookieAuth('Refresh')
      .build();

    const swaggerOptions: SwaggerDocumentOptions = {
      operationIdFactory: (controllerKey: string, methodKey: string) =>
        methodKey,
    };

    const swaggerDocs = SwaggerModule.createDocument(
      this.app,
      swaggerConfig,
      swaggerOptions,
    );

    SwaggerModule.setup(
      'api-docs',
      this.app,
      swaggerDocs,
      swaggerCustomOptions,
    );
  }
}
