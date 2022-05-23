import express from 'express';
import {
  getAllUsers,
  addUser,
  updateUser,
  deleteUser,
  loggedUser,
} from './user.controller';

export const userRouter = express
  .Router()
  .get('/user', /* adminSecure,*/ getAllUsers)
  .post('/user/register', addUser)
  .put('/user/:id', updateUser)
  .delete('/user/:id', deleteUser)
  .get('/logged', loggedUser);
