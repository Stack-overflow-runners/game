import type { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import {
  CommentLike,
  CommentDislike,
  ThreadLike,
  ThreadDislike,
  PostLike,
  PostDislike,
} from '../models/forum.model';
import ApiError from '../utils/error';

class LikeController {
  async setLike(req: Request, res: Response, next: NextFunction) {
    try {
      const { threadId, postId, commentId, userId } = req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(ApiError.badRequest('Validation error'));
      }
      let like;
      if (threadId && !postId) {
        like = await ThreadLike.create({ threadId, userId });
        await ThreadDislike.destroy({ where: { threadId, userId } });
      }
      if (threadId && postId) {
        like = await PostLike.create({ postId, userId });
        await PostDislike.destroy({ where: { postId, userId } });
      }
      if (commentId) {
        like = await CommentLike.create({ commentId, userId });
        await CommentDislike.destroy({ where: { commentId, userId } });
      }
      if (!like) {
        return next(ApiError.badRequest('like not set'));
      }
      await like.save();
      return res.json(like);
    } catch (error: any) {
      return next(ApiError.badRequest(error.message));
    }
  }

  async setDislike(req: Request, res: Response, next: NextFunction) {
    try {
      const { threadId, postId, commentId, userId } = req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(ApiError.badRequest('Validation error'));
      }
      let dislike;
      if (threadId && !postId) {
        dislike = await ThreadDislike.create({ threadId, userId });
        await ThreadLike.destroy({ where: { threadId, userId } });
      }
      if (threadId && postId) {
        dislike = await PostDislike.create({ postId, userId });
        await PostLike.destroy({ where: { postId, userId } });
      }
      if (commentId) {
        dislike = await CommentDislike.create({ commentId, userId });
        await CommentLike.destroy({ where: { commentId, userId } });
      }
      if (!dislike) {
        return next(ApiError.badRequest('dislike not set'));
      }
      await dislike.save();
      return res.json(dislike);
    } catch (error: any) {
      return next(ApiError.badRequest(error.message));
    }
  }
}

export default new LikeController();
