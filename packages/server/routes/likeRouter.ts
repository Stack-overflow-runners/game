import { check } from 'express-validator';
import { LikeController } from '../controllers/index';
import authMiddleware from '../middleware/authMiddleware';

const Router = require('express');

const validationsChecks = [
  check('threadId', 'Укажите id треда').notEmpty().isNumeric().optional(),
  check('postId', 'Укажите id поста').notEmpty().isNumeric().optional(),
  check('commentId', 'Укажите id комментария')
    .notEmpty()
    .isNumeric()
    .optional(),
];
const likeRouter = new Router();
likeRouter.post('/', authMiddleware, validationsChecks, LikeController.setLike);

const dislikeRouter = new Router();
dislikeRouter.post(
  '/',
  authMiddleware,
  validationsChecks,
  LikeController.setDislike
);

export { dislikeRouter, likeRouter };
