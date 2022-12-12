import type { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import ApiError from '../utils/error';
import { Post } from '../models/forum.model';

class PostController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { content, userId, threadId } = req.body;
      if (!userId) {
        return next(ApiError.forbidden('user is required'));
      }
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(ApiError.badRequest('Validation error'));
      }
      const post = await Post.create({
        content,
        userId,
        threadId,
      });
      await post.save();
      return res.json(post);
    } catch (error: any) {
      return next(ApiError.badRequest(error.message));
    }
  }

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.body;
      if (!userId) {
        return next(ApiError.forbidden('user is required'));
      }
      const comments = await Post.findAll();
      return res.json(comments);
    } catch (error: any) {
      return next(ApiError.badRequest(error.message));
    }
  }

  async getOne(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { userId } = req.body;
      if (!userId) {
        return next(ApiError.forbidden('user is required'));
      }
      const thread = await Post.findOne({ where: { id } });
      return res.json(thread);
    } catch (error: any) {
      return next(ApiError.badRequest(error.message));
    }
  }
}

export default new PostController();
