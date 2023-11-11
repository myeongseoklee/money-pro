import { registerAs } from '@nestjs/config';
import { DatabaseType } from 'typeorm';

export default registerAs('orm', () => ({
  type: 'mysql' as DatabaseType,
  port: +process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  host: process.env.DB_HOST,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: process.env.NODE_ENV === 'production' ? false : true,
  autoLoadEntities: process.env.NODE_ENV === 'production' ? false : true,
  logging: process.env.NODE_ENV === 'production' ? false : true,
  charset: 'utf8mb4',
  extra: {
    charset: 'utf8mb4_general_ci',
  },
}));