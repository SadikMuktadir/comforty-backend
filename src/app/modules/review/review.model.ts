import { model, Schema } from 'mongoose';
import { IReview } from './review.interface';

const reviewSchema = new Schema<IReview>(
  {
    image: {
      type: String,
    },
    name: {
      type: String,
    },
    profession: {
      type: String,
    },
    description: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

const Review = model<IReview>('Review', reviewSchema);

export default Review;
