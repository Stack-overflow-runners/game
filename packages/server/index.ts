import dotenv from 'dotenv';
import cors from 'cors';
import express from 'express';
import { dbConnect } from './db';
import router from './routes';
import errorHandler from './middleware/errorHandlingMiddleware';

dotenv.config();
const port = Number(process.env.SERVER_PORT) || 3001;
const origin = ['http://localhost:3000', 'http://prodDomain.com'];

const app = express();
app.use(cors({ credentials: true, origin }));
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
