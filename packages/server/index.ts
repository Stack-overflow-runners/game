import dotenv from 'dotenv';
import cors from 'cors';
import express from 'express';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import * as http from 'http';
import { dbInit } from './db';
import router from './routes';
import errorHandler from './middleware/errorHandlingMiddleware';
import { APP_CURRENT_URL, IS_PROD, SERVER_PORT } from './utils/const';
import proxyMiddleware from './middleware/proxyMiddleware';
import createThemes from './utils/create-themes';

dotenv.config();

const app = express();
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: [`'self'`],
        styleSrc: [`'self'`, `'unsafe-inline'`],
        scriptSrc: [`'self'`, `https: 'unsafe-inline'`],
      },
    },
    crossOriginResourcePolicy: { policy: 'same-site' },
  })
);
app.enable('trust proxy');
if (IS_PROD) {
  app.use((req, res, next) => {
    if (req.secure) return next();
    return res.redirect(`https://${req.headers.host}${req.url}`);
  });
}
app.use(cors({ credentials: true, origin: APP_CURRENT_URL }));
app.use(express.json());
app.use('/api/user/**', proxyMiddleware);
app.use('/api/leaderboard/**', proxyMiddleware);
app.use('/api/resources/**', proxyMiddleware);
app.use(cookieParser());
app.use('/api', router);
app.use(errorHandler);

const start = async () => {
  const isDb = await dbInit();
  await createThemes();
  if (isDb) {
    try {
      http.createServer(app).listen(SERVER_PORT, () => {
        console.log('http server started on port', SERVER_PORT);
      });
    } catch (e) {
      console.log('cannot start http server', e);
    }
  }
};

start();
