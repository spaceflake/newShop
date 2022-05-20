import express, { Request, Response, NextFunction, Router } from 'express';
import mongoose from 'mongoose';
import connectDB from './config/db';
import errorHandler from './middleware/errorMiddleware';
import { userRouter } from './resources/user/user.router';
import { UserModel, DbUserInterface, UserInterface } from './resources/user/user.model';
import session from 'express-session';
import cookieParser from 'cookie-parser';
//passport
import passport from 'passport';
import passportLocal from 'passport-local';
import bcrypt from 'bcrypt';


const app = express();
const port = 4000;
// Global middlewares
app.use(express.json());

app.use(
  session({
    secret: "secretCode",
    resave: false,
    saveUninitialized: false,
  })
  );
  app.use(cookieParser());
  app.use(passport.initialize());
  app.use(passport.session());

// Routes

app.use('/api', userRouter);

// 404 handler

// global error handler
app.use(errorHandler);






connectDB();
app.listen(port, () => {
  console.log(`server is running on ${port}`);
});
