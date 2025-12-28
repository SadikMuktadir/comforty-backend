import { sendImageToCloudinary } from '../../utils/hosting/sendImageToCloudinary';
import { IReview } from './review.interface';
import Review from './review.model';

const createReview = async (payload: IReview, file: any) => {
  let imageUrl;
  if (file) {
    const imageName = `${payload?.name}`;
    const path = file?.path;
    const uploadImage = await sendImageToCloudinary(imageName, path);
    imageUrl = uploadImage?.secure_url;
  }
  const reviewData = { ...payload, image: imageUrl };
  const result = await Review.create(reviewData);
  return result;
};

const getReview = async () => {
  const result = await Review.find();
  return result;
};

const getSingleReview = async (id: string) => {
  const result = await Review.findById(id);
  return result;
};

const deleteReview = async (id: string) => {
  const result = await Review.findByIdAndDelete(id);
  return result;
};

export const reviewService = {
  createReview,
  getReview,
  getSingleReview,
  deleteReview,
};
