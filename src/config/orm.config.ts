import { registerAs } from '@nestjs/config';
import { DatabaseType } from 'typeorm';

export default registerAs('orm', () => ({
  type: 'mysql' as DatabaseType,
  port: +process.env.MYSQL_PORT,
  username: process.env.MYSQL_USERNAME,
  host: process.env.MYSQL_HOST,
  password: process.env.MYSQL_ROOT_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  synchronize: process.env.NODE_ENV === 'production' ? false : true,
  autoLoadEntities: process.env.NODE_ENV === 'production' ? false : true,
  logging: process.env.NODE_ENV === 'production' ? false : true,
  charset: 'utf8mb4',
  extra: {
    charset: 'utf8mb4_general_ci',
  },
}));
