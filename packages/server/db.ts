import { Sequelize, SequelizeOptions } from 'sequelize-typescript';
import type { Nullable } from './types/common';
import models from './models';
import {
  IS_DEV,
  POSTGRES_DB,
  POSTGRES_PASSWORD,
  POSTGRES_PORT,
  POSTGRES_USER,
} from './utils/const';

const options = { force: IS_DEV };
const host = IS_DEV ? 'localhost' : 'postgres';
const sequelizeOptions: SequelizeOptions = {
  host,
  port: POSTGRES_PORT ? parseInt(POSTGRES_PORT, 10) : 5432,
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DB,
  dialect: 'postgres',
  logging: false,
  models,
};

const sequelize = new Sequelize(sequelizeOptions);

export const dbConnect = async (): Promise<Nullable<Sequelize>> => {
  try {
    await sequelize.authenticate();
    console.log('Connection to db has been established successfully.');
    await sequelize.sync(options); // set options in sync to clear tables on file change
    return sequelize;
  } catch (e: any) {
    console.error('Unable to connect to the database:', e);
    return null;
  }
};

export const dbInit = async () => {
  try {
    const connected = await dbConnect();
    return connected;
  } catch (error: any) {
    console.error(error);
    return false;
  }
};

export default sequelize;
