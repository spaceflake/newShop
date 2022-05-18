import express, { Request, Response, NextFunction, Router } from 'express';
import mongoose from 'mongoose';
// import bcrypt from 'bcryptjs';
// import cors from 'cors';

const app = express();
const port = 4000;
// Global middlewares
app.use(express.json());

// Routes

// 404 handler

// global error handler

mongoose.connect('mongodb://localhost:27017/hatsonhats', (err) => {
  if (err) {
    console.error(err);
  } else {
    console.log('Connection to database established!');
    app.listen(port, () => {
      console.log(`server is running on ${port}`);
    });
  }
});
