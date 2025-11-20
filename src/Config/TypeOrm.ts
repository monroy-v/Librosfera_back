import { registerAs } from '@nestjs/config';
import { config as dotenvConfig } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';

dotenvConfig({ path: '.env.development' });
console.log(process.env.DATABASE_NAME,);
console.log("Estoy aca");
const config: DataSourceOptions = {
  type: 'postgres',
  database: process.env.DATABASE_NAME,
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/migrations/*.js'],
  logging: true,
  synchronize: true,
  dropSchema: true,
  migrationsTableName: 'migrations_history',
};
export default registerAs('typeorm', () => config);
export const connectionSource = new DataSource(config);