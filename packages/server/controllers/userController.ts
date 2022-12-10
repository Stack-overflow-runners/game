import type { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import ApiError from '../utils/error';
import User from '../models/user.model';

class UserController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const {
        email,
        first_name: name,
        second_name: lastname,
        login,
        phone,
        avatar,
        id,
      } = req.body;

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(ApiError.badRequest('Validation error'));
      }
      let user = await User.findOne({ where: { yandexId: id } });
      if (!user) {
        user = await User.create({
          yandexId: id,
          email,
          name,
          lastname,
          login,
          phone,
          avatar,
        });
        await user.save();
      }
      return res.json(user);
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
      const users = await User.findAll();
      return res.json(users);
    } catch (error: any) {
      return next(ApiError.badRequest(error.message));
    }
  }
}

export default new UserController();
