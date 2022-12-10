import type { Request, Response } from 'express';
import {
  Post,
  Thread,
  Comment,
  ThreadLike,
  ThreadDislike,
  PostLike,
  PostDislike,
  CommentLike,
  CommentDislike,
} from '../models/forum.model';
import User from '../models/user.model';

class ForumController {
  async get(_: Request, res: Response) {
    // TODO check if user is logged in
    // not optimized temporary solution
    const values = await Promise.all([
      Thread.findAll({ include: [ThreadLike, ThreadDislike, User] }),
      Post.findAll({ include: [PostLike, PostDislike, User] }),
      Comment.findAll({ include: [CommentLike, CommentDislike, User] }),
      User.findAll(),
    ]);
    const [threads, posts, comments, users] = values.map(value =>
      value.map(item => item.toJSON())
    );
    return res.json({ threads, posts, comments, users });
  }
}

export default new ForumController();
