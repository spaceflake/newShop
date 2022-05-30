import bcrypt from 'bcrypt';
import { NextFunction, Request, Response } from 'express';
import { User, UserModel } from './user.model';

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
          throw new Error('Could not hash the password')
        }

        const user = new UserModel({
          firstName,
          lastName,
          email,
          password: hashPassword,
        });

        if (!user) {
          throw new Error('Could not create new user')
        }
        await user.save();
        res.status(200).json(user);
        console.log(user);
    }
  });
};
export const updateUser = async (req: Request<{ id: string }>, res: Response) => {
  if(req.body.userId === req.params.id || req.body.isAdmin) {
    if (req.body.password) {
              try {
                const salt = await bcrypt.genSalt(10);
                return req.body.password = await bcrypt.hash(req.body.password, salt)
              } catch (err) {
                return res.status(500).json(err)
              }
            }
    try {
            const user = await UserModel.findByIdAndUpdate(req.params.id, { 
               $set: req.body
            });
            res.status(200).json('UPDATED USER WITH ID: ' + req.params.id);
          } catch (err) {
            return res.status(500).json('error')
          }
        } else {
          return res.status(403).json('can not update ')
        }
 
};
export const deleteUser = async (req: Request, res: Response) => {
  if(req.body.userId === req.params.id || req.body.isAdmin) {
    try {
      const user = await UserModel.findByIdAndDelete(req.params.id);
      return res.status(200).json('DELETED USER');
    } catch (err) {
      return  res.status(500).json('error')
    }
  } else {
    return res.status(403).json('can not delete ')
  }
}
  

export const loggedUser = async (req: Request, res: Response) => {
  res.send(req.user);
  console.log(req.user);
};
