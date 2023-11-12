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
      .setTitle('MoneyPro')
      .setDescription(
        `머니프로는 사용자들이 자신의 지출을 관리하고 원하는 목표 저축액 달성을 돕기위한 어플리케이션입니다. 원하는 저축액 달성을 위해 개인의 소비지출을 추적하는 데 도움을 주고 절약 목표 달성을 위한 motivation을 제공합니다.`,
      )
      .setVersion('1.0.0')
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
