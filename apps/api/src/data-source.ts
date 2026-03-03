import { DataSource } from 'typeorm';
import { Test } from './users/entities/user.entity';

export default new DataSource({
    type: 'postgres',
    url: process.env.DATABASE_URL,
    entities: [Test],
    migrations: ['src/migrations/*.ts'],
});