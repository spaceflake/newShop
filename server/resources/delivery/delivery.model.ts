import mongoose from 'mongoose';

export interface Delivery {
  name: string;
  altText: string;
  shippingTime: number;
  price: number;
  logo: string;
  id: string;
}

const deliverySchema = new mongoose.Schema({
  name: { type: String, required: true },
  altText: { type: String, required: true },
  shippingTime: { type: Number, required: true },
  price: { type: Number, required: true },
  logo: { type: String, required: true },
  id: { type: String, required: true },
});

export const DeliveryModel = mongoose.model<Delivery>(
  'delivery',
  deliverySchema
);
