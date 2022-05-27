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
  /*   try {
      const product = new ProductModel(req.body);
      await product.save();
      res.status(200).json(product);
    } catch (err) {
      next(err);
    }
   */

  const product = new ProductModel(req.body);

  if (!product) {
    return res.status(400).json('Product can not be added')
  }

  await product.save();
  res.status(200).json(product);

};

export const updateProduct = (req: Request<{ id: string }>, res: Response) => {
  res.status(200).json('UPDATED PRODUCT WITH ID: ' + req.params.id);
};

export const deleteProduct = (req: Request, res: Response) => {
  res.status(200).json('DELETED PRODUCT');
};
