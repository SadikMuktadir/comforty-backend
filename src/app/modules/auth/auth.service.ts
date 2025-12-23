import { sendImageToCloudinary } from '../../utils/hosting/sendImageToCloudinary';
import { ILoginUser, IUser } from './auth.interfave';
import bcrypt from 'bcrypt';
import User from './auth.model';
import config from '../../config';
import jwt from 'jsonwebtoken';

const registerUser = async (payload: IUser, file: any) => {
  if (!payload.password) {
    throw new Error('Password is required');
  }

  const hashedPassword = await bcrypt.hash(payload.password, 12);
  let imageUrl;
  if (file) {
    const imageName = `${payload?.name}`;
    const path = file?.path;
    const uploadImage = await sendImageToCloudinary(imageName, path);
    imageUrl = uploadImage?.secure_url;
  }
  const userData = { ...payload, password: hashedPassword, image: imageUrl };
  const result = await User.create(userData);
  const token = jwt.sign(
    {
      image: result.image,
      email: result.email,
      name: result.name,
      role: result.role,
    },
    config.jwt_secret || 'secret-token',
    { expiresIn: '30d' },
  );

  return { token, user: result };
};

const loginUser = async (payload: ILoginUser) => {
  const user = await User.findOne({
    email: payload?.email,
  }).select('+password');

  if (!user) {
    throw new Error('User not found');
  }

  const isPasswordMatched = await bcrypt.compare(
    payload?.password,
    user?.password,
  );

  if (!isPasswordMatched) {
    throw new Error('Invalid credentials');
  }

  if (!config.jwt_secret) {
    throw new Error('JWT_SECRET is not defined');
  }
  const token = jwt.sign(
    {
      image: user?.image,
      email: user?.email,
      name: user?.name,
      role: user?.role,
    },
    config.jwt_secret || 'secret-token',
    { expiresIn: '30d' },
  );

  return { token, user };
};

export const authService = {
  registerUser,
  loginUser,
};
