import express from 'express';
import {
  getAllOrders,
  getOrder,
  addOrder,
  updateOrder,
} from './order.controller';

export const orderRouter = express
  .Router()
  .get('/order', /* adminSecure,*/ getAllOrders)
  .get('/order/:id', /* adminSecure,*/ getOrder)
  .post('/order', addOrder)
  .put('/order/:id', /* adminSecure,*/ updateOrder);
