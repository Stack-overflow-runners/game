import { ForumController } from '../controllers/index';
import authMiddleware from '../middleware/authMiddleware';

const Router = require('express');

const router = new Router();

router.get('/', authMiddleware, ForumController.get);

export default router;
