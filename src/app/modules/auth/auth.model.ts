import { model, Schema } from 'mongoose';
import { IUser } from './auth.interfave';

const userSchema = new Schema<IUser>(
  {
    image: {
      type: String,
    },
    name: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['admin', 'user'],
      default: 'user',
    },
  },
  {
    timestamps: true,
  },
);

const User = model<IUser>('User', userSchema);
export default User;
