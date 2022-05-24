import express from 'express';
import {
  getAllProducts,
  addProduct,
  updateProduct,
  deleteProduct,
  getCategories,
} from './product.controller';

export const productRouter = express
  .Router()
  .get('/product', /* adminSecure,*/ getAllProducts)
  .get('/product/categories', getCategories)
  .post('/product', addProduct)
  .put('/product/:id', updateProduct)
  .delete('/product/:id', deleteProduct);
