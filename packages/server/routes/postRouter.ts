import { check } from 'express-validator';
import { PostController } from '../controllers/index';
import authMiddleware from '../middleware/authMiddleware';

const Router = require('express');

const router = new Router();

router.get('/', authMiddleware, PostController.getAll);
router.get('/:id', authMiddleware, PostController.getOne);
router.post(
  '/',
  authMiddleware,
  [
    check('content', 'Контент не может быть пустым').notEmpty(),
    check('threadId', 'Укажите id треда').notEmpty().isNumeric(),
  ],
  PostController.create
);

export default router;
