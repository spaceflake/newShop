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
  .get('/product', getAllProducts)
  .get('/product/categories', getCategories)
  .post('/product',  /* adminSecure,*/ addProduct)
  .put('/product/:id',  /* adminSecure,*/ updateProduct)
  .delete('/product/:id',  /* adminSecure,*/ deleteProduct);
