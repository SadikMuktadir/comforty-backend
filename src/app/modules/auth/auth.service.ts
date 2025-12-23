import { sendImageToCloudinary } from '../../utils/hosting/sendImageToCloudinary';
import { IUser } from './auth.interfave';
import bcrypt from 'bcrypt';
import User from './auth.model';

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
  return { user: result };
};

export const authService = {
  registerUser,
};
