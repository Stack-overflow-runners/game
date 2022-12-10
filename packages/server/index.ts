import dotenv from 'dotenv';
import cors from 'cors';
import express from 'express';
import { dbConnect } from './db';
import { forumModelCheck } from './utils/crud-check';

dotenv.config();

const app = express();
app.use(cors());
const port = Number(process.env.SERVER_PORT) || 3001;

app.get('/', (_, res) => {
  res.json('👋 Howdy from the server :)');
});

const start = async () => {
  try {
    await dbConnect();
    await forumModelCheck();
    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  } catch (e: any) {
    console.error(e);
  }
};

start();
