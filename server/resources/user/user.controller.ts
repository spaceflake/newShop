import { NextFunction, Request, Response } from 'express';
import { UserModel, DbUserInterface, UserInterface } from './user.model';
import bcrypt from 'bcrypt';

export const getAllUsers = async (req: Request, res: Response) => {
  // TODO: Who is allowed to use this endpoint?
  const users = await UserModel.find({});
  res.status(200).json(users);
};
export const addUser = async (
  req: Request<{}, {}, DbUserInterface>,
  res: Response,
  next: NextFunction
) => {
  // TODO: How do we handle errors in async middlewares?
  const { firstName, lastName, password, email } = req?.body;
  if (
    !firstName ||
    !lastName ||
    !password ||
    !email ||
    typeof firstName !== 'string' ||
    typeof lastName !== 'string' ||
    typeof password !== 'string' ||
    typeof email !== 'string'
  ) {
    res.json({ msg: 'Improper values' });
    return;
  }
  UserModel.findOne({ email }, async (err: Error, doc: any) => {
    if (err) throw err;
    if (doc) res.json({ msg: 'This email has an account already' });
    if (!doc) {
      try {
        const hashPassword = await bcrypt.hash(password, 10);
        const user = new UserModel({
          firstName,
          lastName,
          email,
          password: hashPassword,
        });
        await user.save();
        res.status(200).json(user);
        console.log(user);
      } catch (err) {
        next(err);
      }
    }
  });
};
export const updateUser = (req: Request<{ id: string }>, res: Response) => {
  res.status(200).json('UPDATED USER WITH ID: ' + req.params.id);
};
export const deleteUser = (req: Request, res: Response) => {
  res.status(200).json('DELETED USER');
};

export const loggedUser = async (req: Request, res: Response) => {
  res.send(req.user);
  console.log(req.user);
};
