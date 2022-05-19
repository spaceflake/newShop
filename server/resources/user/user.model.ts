import mongoose from 'mongoose';

export interface DbUserInterface {
  _id: string;
  firstName: string;
  lastName: string;
  password: string;
  email: string;
  phone: string;
  isAdmin: boolean;
  createdAt: Date;
  updateAt: Date;
}
export interface UserInterface  {
  firstName: string;
  lastName: string;
  email: string;
  isAdmin: boolean;
  id: string;
}
const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  isAdmin: { type: Boolean, required: true, default: false },
});

export const UserModel = mongoose.model<DbUserInterface>('user', userSchema);
