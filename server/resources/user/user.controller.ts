import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import { HttpError } from '../../middleware/errorMiddleware';
import { User, UserModel } from './user.model';

export const getAllUsers = async (req: Request, res: Response) => {
  const users = await UserModel.find({});
  
  if (!users) {
    throw new HttpError(404, 'Users not found')
  }
  res.status(200).json(users);
};
export const addUser = async (
  req: Request<{}, {}, User>,
  res: Response,
) => {
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
      const hashPassword = await bcrypt.hash(password, 10);

      if (!hashPassword) {
        throw new Error('Could not hash the password');
      }

      const user = new UserModel({
        firstName,
        lastName,
        email,
        password: hashPassword,
      });

      if (!user) {
        throw new Error('Could not create new user');
      }
      await user.save();
      res.status(200).json(user);
    }
  });
};
export const updateUser = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  if (req.body.password) {
    const salt = await bcrypt.genSalt(10);
    if (!salt) {
      throw new HttpError(500, 'bcrypt salt not created');
    }
    return (req.body.password = await bcrypt.hash(req.body.password, salt));
  }
  const user = await UserModel.findByIdAndUpdate(req.params.id, {
    $set: req.body,
  });
  if (!user) {
    throw new HttpError(404, 'User not found');
  }
  res.status(200).json('Updated user with id: ' + req.params.id);
};
export const deleteUser = async (req: Request, res: Response) => {
  const user = await UserModel.findByIdAndDelete(req.params.id);
  if (!user) {
    throw new HttpError(404, 'User not found');
  }
  return res.status(200).json('Deleted user');
};

export const loggedUser = async (req: Request, res: Response) => {
  res.send(req.user);
};

export const adminRequest = async (req: Request, res: Response) => {
  const user = await UserModel.findById(req.params.id);
  if (!user) {
    throw new HttpError(404, 'User not found');
  }
  await user.updateOne({
    $set: { adminRequested: true },
  });

  res.status(200).json({
    success: true,
    msg: 'Your request for becoming an admin has been sent.',
    user,
  });
};
