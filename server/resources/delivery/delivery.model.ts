import mongoose, { Schema, Types } from 'mongoose';

export interface Delivery {
  name: string;
  altText: string;
  shippingTime: number;
  price: number;
  logoId: Types.ObjectId;
  /** Virtual */ logoUrl: string;
  id: string;
}

const deliverySchema = new mongoose.Schema<Delivery>(
  {
    name: { type: String, minlength: 6, required: true },
    altText: { type: String, minlength: 2, required: true },
    shippingTime: { type: Number, minlength: 1, required: true },
    price: { type: Number, minlength: 1, required: true },
    logoId: { type: Schema.Types.ObjectId, required: true },
    id: { type: String, required: true },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

deliverySchema.virtual('logoUrl').get(function () {
  return '/api/media/' + this.logoId;
});

export const DeliveryModel = mongoose.model('delivery', deliverySchema);
