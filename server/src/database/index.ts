import { DataSource } from 'typeorm';

export async function createDatabaseConnection() {
  const appDataSource = new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'user',
    password: 'pass',
    database: 'app-dws',
    synchronize: true,
    logging: false,
    entities: ['src/entities/*.ts'],
    migrations: ['src/database/migrations/*.ts'],
    subscribers: [],
  });

  try {
    await appDataSource.initialize();
  } catch (error) {
    console.log('Something went wrong on database connection', { error });
  }
} 
