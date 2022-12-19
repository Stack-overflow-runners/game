import type { NextFunction, Request, Response } from 'express';
import ApiError from '../utils/error';
import User from '../models/user.model';

// deprecated controller, may use in future for theme switching
class UserController {
  async get(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.user;
      const userDb = await User.findByPk(userId);
      if (!userDb) {
        return next(ApiError.badRequest('user not found'));
      }
      return res.status(200).json(userDb);
    } catch (error: any) {
      return next(ApiError.badRequest(error.message));
    }
  }
}

export default new UserController();
