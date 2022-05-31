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
    firstName: { type: String, minLength: 2, maxLength: 26, required: true },
    lastName: { type: String, minLength: 2, maxLength: 26, required: true },
    password: { type: String, required: true },
    email: { type: String, minLength: 3, maxlength: 320, required: true },
    isAdmin: { type: Boolean, required: true, default: false },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

export const UserModel = mongoose.model('user', userSchema);
