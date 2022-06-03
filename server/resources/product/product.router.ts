import express from 'express';
import { admin, auth } from '../../middleware/auth';
import {
  getAllProducts,
  addProduct,
  updateProduct,
  deleteProduct,
  getCategories,
} from './product.controller';

export const productRouter = express
  .Router()
  .get('/product', getAllProducts)
  .get('/product/categories', getCategories)
  .post('/product', auth, admin, addProduct)
  .put('/product/:id', auth, admin, updateProduct)
  .delete('/product/:id', auth, admin, deleteProduct);
