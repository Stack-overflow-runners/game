import { Sequelize, SequelizeOptions } from 'sequelize-typescript';
import type { Nullable } from 'client/src/types/common';
import models from './models';

const { POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB, POSTGRES_PORT } =
  process.env;

const sequelizeOptions: SequelizeOptions = {
  host: 'localhost',
  port: POSTGRES_PORT ? parseInt(POSTGRES_PORT, 10) : 5432,
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DB,
  dialect: 'postgres',
  models,
};

const sequelize = new Sequelize(sequelizeOptions);
const isDev = process.env.NODE_ENV === 'development';
const options = { force: isDev };

export const dbConnect = async (): Promise<Nullable<Sequelize>> => {
  try {
    await sequelize.authenticate();
    console.log('Connection to db has been established successfully.');
    await sequelize.sync(options);
    return sequelize;
  } catch (e: any) {
    console.error('Unable to connect to the database:', e);
    return null;
  }
};

export default sequelize;
