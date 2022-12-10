import { check } from 'express-validator';
import { UserController } from '../controllers/index';
import authMiddleware from '../middleware/authMiddleware';

const Router = require('express');

const router = new Router();

router.get('/', authMiddleware, UserController.getAll);
router.post(
  '/signin',
  authMiddleware,
  [
    check('second_name', 'Укажите фамилию').notEmpty(),
    check('first_name', 'Укажите имя').notEmpty(),
    check('login', 'Укажите логин').notEmpty().isLength({ min: 3 }),
    check('email', 'Укажите email').notEmpty().isEmail(),
    check('id', 'Укажите id yandex').notEmpty().isNumeric(),
  ],
  UserController.create
);

export default router;
