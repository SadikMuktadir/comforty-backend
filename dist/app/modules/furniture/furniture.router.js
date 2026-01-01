"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const furniture_controller_1 = require("./furniture.controller");
const sendImageToCloudinary_1 = require("../../utils/hosting/sendImageToCloudinary");
const furnitureRouter = (0, express_1.Router)();
furnitureRouter.post('/create-furniture', sendImageToCloudinary_1.upload.single('file'), (req, res, next) => {
    next();
}, furniture_controller_1.furnitureController.createFurniture);
furnitureRouter.get('/all-furniture', furniture_controller_1.furnitureController.getFurniture);
furnitureRouter.get('/all-furniture/:furnitureId', furniture_controller_1.furnitureController.getSingleFurniture);
furnitureRouter.patch('/update-furniture/:furnitureId', furniture_controller_1.furnitureController.updateFurniture);
furnitureRouter.delete('/delete-furniture/:furnitureId', furniture_controller_1.furnitureController.deleteFurniture);
exports.default = furnitureRouter;
