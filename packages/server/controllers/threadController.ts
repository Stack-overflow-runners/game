import type { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { Thread } from '../models/forum.model';
import ApiError from '../utils/error';

class ThreadController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { content, userId } = req.body;
      if (!userId) {
        return next(ApiError.forbidden('user is required'));
      }
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(ApiError.badRequest('Validation error'));
      }
      const thread = await Thread.create({
        content,
        userId,
      });
      await thread.save();
      return res.json(thread);
    } catch (error: any) {
      return next(ApiError.badRequest(error.message));
    }
  }

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.query;
      if (!userId) {
        return next(ApiError.forbidden('user is required'));
      }
      const comments = await Thread.findAll();
      return res.json(comments);
    } catch (error: any) {
      return next(ApiError.badRequest(error.message));
    }
  }

  async getOne(req: Request, res: Response, next: NextFunction) {
    try {
      const { id, userId } = req.params;
      if (!userId) {
        return next(ApiError.forbidden('user is required'));
      }
      const thread = await Thread.findOne({ where: { id } });
      return res.json(thread);
    } catch (error: any) {
      return next(ApiError.badRequest(error.message));
    }
  }
}

export default new ThreadController();
