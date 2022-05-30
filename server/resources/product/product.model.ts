import mongoose from 'mongoose';

export interface Product {
  id?: string;
  title: string;
  description: string;
  price: number;
  photo: string;
  categories: string[];
  stock: number;
}

export const ProductSchema = new mongoose.Schema<Product>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    photo: { type: String, required: true },
    categories: { type: [String], required: true },
    stock: { type: Number, required: true },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

export const ProductModel = mongoose.model('product', ProductSchema);
