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
    title: { type: String, minLength: 3, maxlength: 40, required: true },
    description: { type: String, minLength: 3, maxlength: 50, required: true },
    price: { type: Number, min: 0, maxlength: 6, required: true },
    photo: { type: String, required: true },
    categories: { type: [String], required: true },
    stock: { type: Number, min: 0, maxlength: 3, required: true },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

export const ProductModel = mongoose.model('product', ProductSchema);
