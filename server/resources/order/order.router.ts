import express from 'express';
import { admin, auth } from '../../middleware/auth';
import {
  getAllOrders,
  getOrder,
  addOrder,
  updateOrder,
  getSpecUserOrders,
} from './order.controller';

export const orderRouter = express
  .Router()
  .get('/order', auth, admin, getAllOrders)
  .get('/order/:id', auth, getOrder)
  .get('/users-orders/:id', getSpecUserOrders)
  .post('/order', auth, addOrder)
  .put('/order/:id', auth, admin, updateOrder);
