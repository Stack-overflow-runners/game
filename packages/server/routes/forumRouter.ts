import { ForumController } from '../controllers/index';
import authMiddleware from '../middleware/authMiddleware';
import threadRouter from './threadRouter';
import postRouter from './postRouter';
import commentRouter from './commentRouter';
import { dislikeRouter, likeRouter } from './likeRouter';

const Router = require('express');

const router = new Router();

router.get('/', authMiddleware, ForumController.get);

router.use('/forum/thread', threadRouter);
router.use('/forum/post', postRouter);
router.use('/forum/comment', commentRouter);
router.use('/forum/like', likeRouter);
router.use('/forum/dislike', dislikeRouter);

export default router;
