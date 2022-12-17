import { UserController } from '../controllers/index';
import authMiddleware from '../middleware/authMiddleware';

const Router = require('express');

const router = new Router();

router.get('/', authMiddleware, UserController.get);

export default router;
