import { Request, Response } from 'express';
import { HttpError } from '../../middleware/errorMiddleware';
import { Order } from '../order';
import { Product, ProductModel } from './product.model';

export const getAllProducts = async (_req: Request, res: Response) => {
  // TODO: Who is allowed to use this endpoint?
  const products = await ProductModel.find({});

  if (!products) {
    throw new HttpError(404, 'Could not retrieve products');
  }

  res.status(200).json(products);
};

export const getCategories = async (_req: Request, res: Response) => {
  const products = await ProductModel.find({}).select('categories');

  if (!products) {
    throw new HttpError(404, 'Could not retrieve products to extract categories');
  }

  const categories = products.reduce<string[]>((categories, product) => {
    categories.push(...product.categories);
    return categories;
  }, []);

  const uniqueCategories = Array.from(new Set(categories));
  res.status(200).json(uniqueCategories);
};

export const addProduct = async (
  req: Request<{}, {}, Product>,
  res: Response
) => {
  const product = new ProductModel(req.body);

  if (!product) {
    throw new HttpError(500, 'Product can not be added');
  }

  await product.save();
  res.status(200).json(product);
};
export const updateProduct = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  const product = await ProductModel.findById(req.params.id);
  if (!product) {
    throw new HttpError(404, 'Product not found');
  }
  await product?.updateOne({
    $set: { ...req.body, photoId: '6298712ce7b4e60b692e0db2' },
  });
  res.status(200).json('Updated product with id: ' + req.params.id);
};
export const deleteProduct = async (req: Request, res: Response) => {
  const product = await ProductModel.findById(req.params.id);
  if (!product) {
    throw new HttpError(404, 'Product not found');
  }
  await product?.deleteOne({ $set: req.body });
  res.status(200).json('Deleted product with id: ' + req.params.id);
};

export const updateStock = async (order: Order) => {
  for (const product of order.products) {
    if (!order.products) {
      throw new HttpError(404, 'Products not found');
    }
    await ProductModel.findByIdAndUpdate(product.id, {
      $inc: { stock: -product.qty },
    });
  }
};
