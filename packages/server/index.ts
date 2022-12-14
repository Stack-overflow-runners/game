import dotenv from 'dotenv';
import cors from 'cors';
import express from 'express';
import { dbConnect } from './db';
import router from './routes';
import errorHandler from './middleware/errorHandlingMiddleware';

dotenv.config();
const port = Number(process.env.SERVER_PORT) || 3001;
const clientPort = Number(process.env.CLIENT_PORT) || 3000;
const isProduction = process.env.NODE_ENV === 'production';
const devHost = `http://localhost:${clientPort}`;
const prodHost = 'http://stack-overflow-runners.ya-praktikum.tech';
const host = isProduction ? prodHost : devHost;

const app = express();
app.use(cors({ credentials: true, origin: host }));
app.use(express.json());
app.use('/api', router);
app.use(errorHandler);
app.get('/', (_, res) => {
  res.json('👋 Howdy from the server :)');
});

const start = async () => {
  try {
    await dbConnect();
    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  } catch (e: any) {
    console.error(e);
  }
};

start();
