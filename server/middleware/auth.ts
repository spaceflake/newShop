import { NextFunction, Request, Response } from 'express';
import { User } from '../resources/user';
import { HttpError } from './errorMiddleware';

export const auth = (req: Request, res: Response, next: NextFunction) => {
  if (req.user) {
    next();
  } else {
    throw new HttpError(401, 'You must be logged in');
  }
};
export const admin = (req: Request, res: Response, next: NextFunction) => {
  if ((req.user as User)?.isAdmin) {
    next();
  } else {
    throw new HttpError(403, 'Not allowed');
  }
};
