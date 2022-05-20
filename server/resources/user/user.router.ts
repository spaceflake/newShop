import express from 'express';
import {
  getAllUsers,
  addUser,
  updateUser,
  deleteUser,
  handleLogin,
  // handleLogout,
} from './user.controller';

export const userRouter = express
  .Router()
  .get('/user', /* adminSecure,*/ getAllUsers)
  .post('/user/register', addUser)
  .put('/user/:id', updateUser)
  .delete('/user/:id', deleteUser)
  .post('/user/login', handleLogin)
  // .post('/user/logout', handleLogout)