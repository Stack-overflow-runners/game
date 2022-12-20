import { ThemeController, UserController } from '../controllers/index';
import authMiddleware from '../middleware/authMiddleware';

const Router = require('express');

const router = new Router();

router.get('/', authMiddleware, UserController.get);
router.get('/theme', ThemeController.getAll);
router.put('/theme', authMiddleware, ThemeController.set);

export default router;
