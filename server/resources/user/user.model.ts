import mongoose from 'mongoose';

export interface User {
  firstname: string;
  lastname: string;
  password: string;
  email: string;
  phone: string;
  isAdmin: boolean;
  createdAt: Date;
  updateAt: Date;
}

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, required: true, default: false },
});

export const UserModel = mongoose.model<User>('user', userSchema);
