"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const sendImageToCloudinary_1 = require("../../utils/hosting/sendImageToCloudinary");
const auth_controller_1 = require("./auth.controller");
const auth_1 = __importDefault(require("../../middleware/auth"));
const authRouter = (0, express_1.Router)();
authRouter.post('/register-user', sendImageToCloudinary_1.upload.single('file'), (req, res, next) => {
    next();
}, auth_controller_1.authController.registerUser);
authRouter.post('/login-user', auth_controller_1.authController.loginUser);
authRouter.get('/all-user', (0, auth_1.default)('admin'), auth_controller_1.authController.getAllUser);
exports.default = authRouter;
