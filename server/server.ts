import express, { Request, Response, NextFunction, Router } from 'express';
import mongoose from 'mongoose';
import connectDB from './config/db';
import { userRouter } from './resources/user/user.router';
// import bcrypt from 'bcryptjs';
// import cors from 'cors';

const app = express();
const port = 4000;
// Global middlewares
app.use(express.json());

// Routes

app.use('/api', userRouter);

// 404 handler

// global error handler

// mongoose.connect(
//   'mongodb+srv://hatmaker:hatpassword101@hatsonhatsdb.dba57.mongodb.net/?retryWrites=true&w=majority',
//   (err) => {
//     if (err) {
//       console.error(err);
//     } else {
//       console.log('Connection to database established!');
//       app.listen(port, () => {
//         console.log(`server is running on ${port}`);
//       });
//     }
//   }
// );

connectDB();
app.listen(port, () => {
  console.log(`server is running on ${port}`);
});
