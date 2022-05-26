import express from 'express';
import {
  getAllDeliverys,
  getDelivery,
  addDelivery,
  updateDelivery,
  deleteDelivery,
} from './delivery.controller';

export const deliveryRouter = express
  .Router()
  .get('/delivery', /* adminSecure,*/ getAllDeliverys)
  .get('/delivery/:id', /* adminSecure,*/ getDelivery)
  .post('/delivery', addDelivery)
  .put('/delivery/:id', updateDelivery)
  .delete('/delivery/:id', deleteDelivery);
