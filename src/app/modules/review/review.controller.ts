import { Request, Response } from 'express';
import { reviewService } from './review.service';

const createReview = async (req: Request, res: Response) => {
  try {
    const payload = req.body;
    const result = await reviewService.createReview(payload, req?.file);
    res.status(201).send({
      success: true,
      message: 'Review Created Succesfully',
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'Review is not created',
      error: error,
    });
  }
};
const getReview = async (req: Request, res: Response) => {
  try {
    const result = await reviewService.getReview();
    res.status(201).send({
      success: true,
      message: 'Review get Succesfully',
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'Review is not get',
      error: error,
    });
  }
};
const getSingleReview = async (req: Request, res: Response) => {
  try {
    const reviewId = req.params.reviewId;
    const result = await reviewService.getSingleReview(reviewId);
    res.status(201).send({
      success: true,
      message: 'Single Review get',
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'Single Review is not get',
      error: error,
    });
  }
};

const deleteReview = async (req: Request, res: Response) => {
  try {
    const reviewId = req.params.reviewId;
    const result = await reviewService.deleteReview(reviewId);
    res.status(201).send({
      success: true,
      message: 'Review deleted Succesfully',
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'Review is not deleted',
      error: error,
    });
  }
};

export const reviewController = {
  createReview,
  getReview,
  getSingleReview,
  deleteReview,
};
