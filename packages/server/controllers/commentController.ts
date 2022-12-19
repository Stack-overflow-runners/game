import type { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { Comment } from '../models/forum.model';
import ApiError from '../utils/error';

class CommentController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { postId, content } = req.body;
      const { userId } = req.user;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(ApiError.badRequest('Validation error'));
      }
      if (!userId) {
        return next(ApiError.forbidden('user is required'));
      }
      const comment = await Comment.create({
        postId,
        content,
        userId,
      });
      await comment.save();
      return res.json(comment);
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
      const comments = await Comment.findAll();
      return res.json(comments);
    } catch (error: any) {
      return next(ApiError.badRequest(error.message));
    }
  }
}

export default new CommentController();
