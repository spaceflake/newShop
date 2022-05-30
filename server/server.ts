import express, { Request, Response } from 'express';
require('express-async-errors');
import bcrypt from 'bcrypt';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import session from 'express-session';
import passport from 'passport';
import passportLocal from 'passport-local';
import connectDB from './config/db';
import errorHandler from './middleware/errorMiddleware';
import { deliveryRouter } from './resources/delivery';
import { productRouter } from './resources/product/product.router';
import { User, UserModel } from './resources/user/user.model';
import { userRouter } from './resources/user/user.router';

const app = express();
const port = 4000;
// Global middlewares
app.use(express.json());

app.use(
  session({
    secret: 'secretCode',
    resave: false,
    saveUninitialized: false,
  })
);
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

// Routes

app.use('/api', userRouter);
app.use('/api', productRouter);
app.use('/api', deliveryRouter);

// TODO: We need to get this passport below out of here.

const myStrategy = passportLocal.Strategy;

passport.use(
  new myStrategy({ usernameField: 'email' }, async (email, password, done) => {
    UserModel.findOne({ email: email }, (err: any, user: User) => {
      if (err) {
        return done(err);
      }
      if (!user) return done(null, false, { message: 'No user found' });
      bcrypt.compare(password, user.password, (err, result: boolean) => {
        if (err) {
          return done(err);
        }
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
  console.log(user);
});
passport.deserializeUser((id: string, cb) => {
  UserModel.findOne({ _id: id }, (err: any, user: User) => {
    const userInformation: User = {
      firstName: user?.firstName,
      lastName: user?.lastName,
      password: user?.password,
      phone: user.phone,
      email: user?.email,
      isAdmin: user?.isAdmin,
      id: user?.id,
      createdAt: user.createdAt,
      updateAt: user.updateAt,
    };
    cb(err, userInformation);

    console.log(userInformation);
  });
});

app.post(
  '/api/user/login',
  passport.authenticate('local', { failureMessage: true }),
  (req: Request, res: Response) => {
    res.status(200).json({
      success: true,
      message: 'Successfully logged in',
      user: req.user,
    });
  }
);

app.get('/api/user/logout', (req: Request, res: Response) => {
  req.logout();
  res.status(200).json({ success: true, message: 'Logged out successfully' });
});

// Connect to database
connectDB();

// Start server
app.listen(port, () => {
  console.log(`server is running on ${port}`);
});

// global error handler
app.use(errorHandler);