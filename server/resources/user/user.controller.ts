import { NextFunction, Request, Response } from 'express';
import { UserModel, User } from './user.model';

export const getAllUsers = async (req: Request, res: Response) => {
  // TODO: Who is allowed to use this endpoint?
  const users = await UserModel.find({});
  res.status(200).json(users);
};
export const addUser = async (
  req: Request<{}, {}, User>,
  res: Response,
  next: NextFunction
) => {
  // TODO: How do we handle errors in async middlewares?
  try {
    const user = new UserModel(req.body);
    await user.save();
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};
export const updateUser = (req: Request<{ id: string }>, res: Response) => {
  res.status(200).json('UPDATED USER WITH ID: ' + req.params.id);
};
export const deleteUser = (req: Request, res: Response) => {
  res.status(200).json('DELETED USER');
};
