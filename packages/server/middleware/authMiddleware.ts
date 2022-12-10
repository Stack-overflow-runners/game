import type { NextFunction, Request, Response } from 'express';

export default function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (req.method === 'OPTIONS') {
    next();
  }
  try {
    // middleware logic here
    return next();
  } catch (e) {
    return res.status(401).json({ message: 'Не авторизован' });
  }
}
