import { HttpExceptionFilter } from './util/http-exception.filter';
import { validationSchema } from './config/validationSchema';
import { CustomLoggerModule } from './common/logger/custom-logger.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { ConfigModule, ConfigType } from '@nestjs/config';
import authConfig from './config/auth.config';
import appConfig from './config/app.config';
import ormConfig from './config/orm.config';
import { APP_FILTER } from '@nestjs/core';
import { UserModule } from './user/user.module';
import { ExpenditureCategoryModule } from './expenditure-category/expenditure-category.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`${__dirname}/config/env/.${process.env.NODE_ENV}.env`],
      load: [authConfig, appConfig, ormConfig],
      isGlobal: true,
      validationSchema,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: async (token: ConfigType<typeof ormConfig>) =>
        token as TypeOrmModuleAsyncOptions,
      inject: [ormConfig.KEY],
    }),
    CustomLoggerModule,
    UserModule,
    ExpenditureCategoryModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
