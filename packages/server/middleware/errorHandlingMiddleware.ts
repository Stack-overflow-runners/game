import type { NextFunction, Request, Response } from 'express';
import ApiError from '../utils/error';

export default function errorHandlingMiddleware(
  error: Error,
  _: Request,
  res: Response,
  __: NextFunction
) {
  if (error instanceof ApiError) {
    return res.status(error.status).json({ message: error.message });
  }
  return res.status(500).json({ message: 'Непредвиденная ошибка!' });
}
