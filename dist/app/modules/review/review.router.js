"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const sendImageToCloudinary_1 = require("../../utils/hosting/sendImageToCloudinary");
const review_controller_1 = require("./review.controller");
const reviewRouter = (0, express_1.Router)();
reviewRouter.post('/create-review', sendImageToCloudinary_1.upload.single('file'), (req, res, next) => {
    next();
}, review_controller_1.reviewController.createReview);
reviewRouter.get('/all-review', review_controller_1.reviewController.getReview);
reviewRouter.get('/all-review/:reviewId', review_controller_1.reviewController.getSingleReview);
reviewRouter.delete('/delete-review/:reviewId', review_controller_1.reviewController.deleteReview);
exports.default = reviewRouter;
