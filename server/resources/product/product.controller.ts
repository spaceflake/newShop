import { NextFunction, Request, Response } from 'express';
import { ProductModel, Product } from './product.model';

export const getAllProducts = async (req: Request, res: Response) => {
  // TODO: Who is allowed to use this endpoint?
  const products = await ProductModel.find({});
  res.status(200).json(products);
};

export const getCategories = async (req: Request, res: Response) => {
  const products = await ProductModel.find({}).select('categories');

  const categories = products.reduce<string[]>((categories, product) => {
    categories.push(...product.categories);
    return categories;
  }, []);

  const uniqueCategories = Array.from(new Set(categories));
  res.status(200).json(uniqueCategories);
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
export const updateProduct = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const product = await ProductModel.findById(req.params.id);
      await product?.updateOne({ $set: req.body });
      res.status(200).json('UPDATED PRODUCT WITH ID: ' + req.params.id);
    
  } catch (err) {
    res.status(500).json(err);
  }
 
};
export const deleteProduct = async (req: Request, res: Response) => {
  try { 
    const product = await  ProductModel.findById(req.params.id);
    await product?.deleteOne({$set:req.body})
    res.status(200).json('DELETED PRODUCT with ID: ' + req.params.id);
 } catch (err: any) {
  res.status(500).json('error: ' + err.message)
 }
};
