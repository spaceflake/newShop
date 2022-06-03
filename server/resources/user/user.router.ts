import express from 'express';
import { auth, admin } from '../../middleware/Auth';
import {
  getAllUsers,
  addUser,
  updateUser,
  deleteUser,
  loggedUser,
} from './user.controller';

export const userRouter = express
  .Router()
  .get('/user', auth, admin, getAllUsers)
  .post('/user/register', addUser)
  .put('/user/:id', auth, admin, updateUser)
  .delete('/user/:id', auth, admin, deleteUser)
  .get('/logged', loggedUser);
