import mongoose, { Schema } from 'mongoose';
import { Product, ProductSchema } from '../product';
import { User } from '../user';
import { Address, AddressSchema } from './address.schema';

export interface Order {
  id: string;
  orderId: string;
  user: User;
  isSent: boolean;
  products: Product[];
  deliveryAddress: Address[];
  shippingMethod: number;
  orderSum: number;
  createdAt: Date;
}

const OrderSchema = new mongoose.Schema<Order>(
  {
    orderId: {
      type: String,
      required: true,
      default: Math.random().toString(),
    },
    user: { type: Schema.Types.ObjectId, ref: 'user', required: true },
    isSent: { type: Boolean, required: true, default: false },
    products: { type: [ProductSchema], required: true },
    deliveryAddress: { type: [AddressSchema], required: true },
    shippingMethod: { type: Number, required: true },
    orderSum: { type: Number, required: true },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// OrderSchema.post('find', function (next: Function) {
//   this.populate('user');
//   next();
// });
// OrderSchema.post('findOne', function (next: Function) {
//   this.populate('user');
//   next();
// });

export const OrderModel = mongoose.model('order', OrderSchema);
