import mongoose, { Schema, Types } from 'mongoose';

export interface Delivery {
  name: string;
  altText: string;
  shippingTime: number;
  price: number;
  logoId: Types.ObjectId;
  logoUrl: string;
  id: string;
}

const deliverySchema = new mongoose.Schema<Delivery>(
  {
    name: { type: String, required: true },
    altText: { type: String, required: true },
    shippingTime: { type: Number, required: true },
    price: { type: Number, required: true },
    logoId: { type: Schema.Types.ObjectId, required: true },
    id: { type: String, required: true },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

deliverySchema.virtual('logoUrl').get(function () {
  return '/api/media/' + this.logoUrl;
});

export const DeliveryModel = mongoose.model('delivery', deliverySchema);
