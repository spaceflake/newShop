import mongoose, { Schema } from 'mongoose';

export interface Address {
  firstName: string;
  lastName: string;
  phone: string;
  street: string;
  city: string;
  zipcode: string;
  email: string;
}

export const AddressSchema = new mongoose.Schema<Address>(
  {
    firstName: { type: String, minlength: 2, maxlength: 30, required: true },
    lastName: { type: String, minlength: 2, maxlength: 30, required: true },
    phone: { type: String, minlength: 10, maxlength: 10, required: true },
    street: { type: String, minlength: 5, maxLength: 25, required: true },
    city: { type: String, minlength: 2, maxLength: 25, required: true },
    zipcode: { type: String, minlength: 5, maxlength: 5, required: true },
    email: { type: String, required: true },
  },
  {
    _id: false,
  }
);
