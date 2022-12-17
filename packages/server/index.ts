import dotenv from 'dotenv';
import cors from 'cors';
import express from 'express';
import cookieParser from 'cookie-parser';
import { dbConnect } from './db';
import router from './routes';
import errorHandler from './middleware/errorHandlingMiddleware';
import { APP_CURRENT_URL, SERVER_PORT } from './utils/const';
import proxyMiddleware from './middleware/proxyMiddleware';

dotenv.config();

const app = express();
app.use(cors({ credentials: true, origin: APP_CURRENT_URL }));
app.use(express.json());
app.use('/api/user/**', proxyMiddleware);
app.use('/api/leaderboard/**', proxyMiddleware);
app.use('/api/resources/**', proxyMiddleware);
app.use(cookieParser());
app.use('/api', router);
app.use(errorHandler);

const start = async () => {
  try {
    await dbConnect();
    app.listen(SERVER_PORT, () => {
      console.log(`Server listening on port ${SERVER_PORT}`);
    });
  } catch (e: any) {
    console.error(e);
  }
};

start();
