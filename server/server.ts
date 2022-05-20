import express, { Request, Response, NextFunction, Router } from 'express';
import mongoose from 'mongoose';
import connectDB from './config/db';
import errorHandler from './middleware/errorMiddleware';
import { userRouter } from './resources/user/user.router';
import { productRouter } from './resources/product/product.router';
// import bcrypt from 'bcryptjs';
// import cors from 'cors';

const app = express();
const port = 4000;
// Global middlewares
app.use(express.json());

// Routes

app.use('/api', userRouter);
app.use('/api', productRouter);


// 404 handler

// global error handler
app.use(errorHandler);

connectDB();
app.listen(port, () => {
  console.log(`server is running on ${port}`);
});
