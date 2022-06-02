import express from 'express';
import {
  getAllOrders,
  getOrder,
  addOrder,
  updateOrder,
  getSpecUserOrders,
} from './order.controller';

export const orderRouter = express
  .Router()
  .get('/order', /* adminSecure,*/ getAllOrders)
  .get('/order/:id', /* adminSecure,*/ getOrder)
  .get('/users-orders/:id', getSpecUserOrders)
  .post('/order', addOrder)
  .put('/order/:id', /* adminSecure,*/ updateOrder);
