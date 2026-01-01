"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviewController = void 0;
const review_service_1 = require("./review.service");
const createReview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const payload = req.body;
        const result = yield review_service_1.reviewService.createReview(payload, req === null || req === void 0 ? void 0 : req.file);
        res.status(201).send({
            success: true,
            message: 'Review Created Succesfully',
            data: result,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Review is not created',
            error: error,
        });
    }
});
const getReview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield review_service_1.reviewService.getReview();
        res.status(201).send({
            success: true,
            message: 'Review get Succesfully',
            data: result,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Review is not get',
            error: error,
        });
    }
});
const getSingleReview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const reviewId = req.params.reviewId;
        const result = yield review_service_1.reviewService.getSingleReview(reviewId);
        res.status(201).send({
            success: true,
            message: 'Single Review get',
            data: result,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Single Review is not get',
            error: error,
        });
    }
});
const deleteReview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const reviewId = req.params.reviewId;
        const result = yield review_service_1.reviewService.deleteReview(reviewId);
        res.status(201).send({
            success: true,
            message: 'Review deleted Succesfully',
            data: result,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Review is not deleted',
            error: error,
        });
    }
});
exports.reviewController = {
    createReview,
    getReview,
    getSingleReview,
    deleteReview,
};
