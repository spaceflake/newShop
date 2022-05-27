import mongoose from 'mongoose';

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  password: string;
  email: string;
  phone: string;
  isAdmin: boolean;
  createdAt: Date;
  updateAt: Date;
}
const userSchema = new mongoose.Schema<User>(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    isAdmin: { type: Boolean, required: true, default: false },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

export const UserModel = mongoose.model('user', userSchema);
