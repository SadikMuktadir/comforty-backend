import { NextFunction, Request, Response, Router } from 'express';
import { upload } from '../../utils/hosting/sendImageToCloudinary';
import { reviewController } from './review.controller';

const reviewRouter = Router();

reviewRouter.post(
  '/create-review',
  upload.single('file'),
  (req, res, next) => {
    next();
  },
  reviewController.createReview,
);
reviewRouter.get('/all-review', reviewController.getReview);
reviewRouter.get('/all-review/:reviewId', reviewController.getSingleReview);
reviewRouter.delete('/delete-review/:reviewId', reviewController.deleteReview);

export default reviewRouter;
