import { NextFunction, Request, Response } from 'express';
import { UserModel, DbUserInterface, UserInterface } from './user.model';
import bcrypt from 'bcrypt';

import passport from 'passport';
import passportLocal from 'passport-local';

const myStrategy = passportLocal.Strategy

  passport.use(new myStrategy((email: string, password: string, done) => {
    UserModel.findOne({ email: email }, (err: any, user: DbUserInterface) => {
      if (err) throw err;
      if (!user) return done(null, false, { message: 'No user found' });
      bcrypt.compare(password, user.password, (err, result: boolean) => {
        if (err) throw err;
        if (result === true) {
          return done(null, user);
        } else {
          return done(null, false, { message: 'Password incorrect' });
        }
      });
    });
  })
  );
  
  passport.serializeUser((user: any, cb: any) => {
    cb(null, user._id);
  });
  passport.deserializeUser((id: string,  cb) => {
  UserModel.findOne({ _id: id }, (err: any, user: DbUserInterface) => {
  const userInformation: UserInterface = {
    firstName: user?.firstName,
    lastName: user?.lastName,
    email: user?.email,
    isAdmin: user?.isAdmin,
    id: user?._id
  };
  cb(err, userInformation);
  });
  });
// Login Routes
export const handleLogin = (req: Request, res: Response) => {
  passport.authenticate("local"), (req :Request, res:Response) => {
    res.send("success")
}
}

// app.post("/api/login", passport.authenticate("local"), (req :Request, res:Response) => {
//   res.send("success")
// });



















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
  if (!firstName || !lastName || !password || !email || typeof firstName !== 'string' || typeof lastName !== 'string' || typeof password !== 'string' || typeof email !== 'string') {
    res.send('Improper values')
    return;
  }
  UserModel.findOne({email}, async (err: Error, doc: any) => {
    if (err) throw err;
    if(doc) res.send('This email has an account already');
    if(!doc) {
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
      } catch (err) {
        next(err);
      }
    }
  })
  
};
export const updateUser = (req: Request<{ id: string }>, res: Response) => {
  res.status(200).json('UPDATED USER WITH ID: ' + req.params.id);
};
export const deleteUser = (req: Request, res: Response) => {
  res.status(200).json('DELETED USER');
};
