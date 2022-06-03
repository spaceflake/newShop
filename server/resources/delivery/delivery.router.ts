import express from 'express';
import { auth, admin } from '../../middleware/auth';
import {
  getAllDeliverys,
  getDelivery,
  addDelivery,
  updateDelivery,
  deleteDelivery,
} from './delivery.controller';

export const deliveryRouter = express
  .Router()
  .get('/delivery', auth, getAllDeliverys)
  .get('/delivery/:id', auth, getDelivery)
  .post('/delivery',  auth, admin, addDelivery)
  .put('/delivery/:id', auth, admin, updateDelivery)
  .delete('/delivery/:id', auth, admin, deleteDelivery);
