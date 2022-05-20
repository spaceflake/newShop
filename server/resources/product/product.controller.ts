import { NextFunction, Request, Response } from 'express';
import { ProductModel, Product } from './product.model';

export const getAllProducts = async (req: Request, res: Response) => {
  // TODO: Who is allowed to use this endpoint?
  const products = await ProductModel.find({});
  res.status(200).json(products);
};
export const addProduct = async (
  req: Request<{}, {}, Product>,
  res: Response,
  next: NextFunction
) => {
  // TODO: How do we handle errors in async middlewares?
  try {
    const product = new ProductModel(req.body);
    await product.save();
    res.status(200).json(product);
  } catch (err) {
    next(err);
  }
};
export const updateProduct = (req: Request<{ id: string }>, res: Response) => {
  res.status(200).json('UPDATED PRODUCT WITH ID: ' + req.params.id);
};
export const deleteProduct = (req: Request, res: Response) => {
  res.status(200).json('DELETED PRODUCT');
};
