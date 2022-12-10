import { check } from 'express-validator';
import { ThreadController } from '../controllers/index';
import authMiddleware from '../middleware/authMiddleware';

const Router = require('express');

const router = new Router();

router.get('/', authMiddleware, ThreadController.getAll);
router.get('/:id', authMiddleware, ThreadController.getOne);
router.post(
  '/',
  authMiddleware,
  [check('content', 'Контент не может быть пустым').notEmpty()],
  ThreadController.create
);

export default router;
