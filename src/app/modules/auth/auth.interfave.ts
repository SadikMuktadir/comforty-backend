import { Document } from 'mongoose';

export interface IUser extends Document {
  image?: string;
  name?: string;
  email: string;
  password: string;
  role?: 'admin' | 'user';
}
export interface ILoginUser {
  email: string;
  password: string;
}
