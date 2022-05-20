import mongoose from 'mongoose';

export interface Product {
  title: string;
  description: string;
  price: number;
  photo: string;
  categories: string[];
  stock: number;
  
}

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  photo: { type: String, required: true },
  categories: { type: [String], required: true },
  stock: { type: Number, required: true },
});

export const ProductModel = mongoose.model<Product>('product', productSchema);