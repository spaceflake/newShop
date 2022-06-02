import mongoose, { Schema, Types } from 'mongoose';

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  photoId: Types.ObjectId;
  categories: string[];
  stock: number;
  qty: number;
  /** Virtual */ photoUrl: string;
}

export const ProductSchema = new Schema<Product>(
  {
    title: { type: String, minLength: 3, maxlength: 40, required: true },
    description: { type: String, minLength: 3, required: true },
    price: { type: Number, min: 0, maxlength: 6, required: true },
    photoId: { type: Schema.Types.ObjectId, required: true },
    categories: { type: [String], required: true },
    stock: { type: Number, min: 0, required: true },
    qty: { type: Number, min: 0, required: true },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

ProductSchema.virtual('photoUrl').get(function () {
  return '/api/media/' + this.photoId;
});

export const ProductModel = mongoose.model('product', ProductSchema);
