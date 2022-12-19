import threadRouter from './threadRouter';
import forumRouter from './forumRouter';
import { dislikeRouter, likeRouter } from './likeRouter';
import commentRouter from './commentRouter';
import userRouter from './userRouter';
import postRouter from './postRouter';

const Router = require('express');

const router = new Router();

router.use('/user', userRouter);
router.use('/forum', forumRouter);
router.use('/forum/thread', threadRouter);
router.use('/forum/post', postRouter);
router.use('/forum/comment', commentRouter);
router.use('/forum/like', likeRouter);
router.use('/forum/dislike', dislikeRouter);

export default router;
