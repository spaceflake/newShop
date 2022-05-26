import mongoose, { Schema } from 'mongoose';

export interface Address {
  firstName: string;
  lastName: string;
  phone: string;
  street: string;
  city: string;
  zipcode: string;
}

export const AddressSchema = new mongoose.Schema<Address>(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phone: { type: String, required: true },
    street: { type: String, required: true },
    city: { type: String, required: true },
    zipcode: { type: String, required: true },
  },
  {
    _id: false,
  }
);
