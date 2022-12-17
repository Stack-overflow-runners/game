import type { NextFunction, Request, Response } from 'express';
import { getUser, transformUserDTOtoUserEntity } from '../utils/user';

export default async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (req.method === 'OPTIONS') {
    return next();
  }
  try {
    const { cookies } = req;
    if (cookies) {
      const user = await getUser(cookies);
      if (user) {
        req.user = transformUserDTOtoUserEntity(user);
        return next();
      }
    }
    return res.status(403).json({ reason: 'Не авторизованный запрос' });
  } catch (error: any) {
    return res.status(403).json({ reason: 'Не авторизованный запрос', error });
  }
}
