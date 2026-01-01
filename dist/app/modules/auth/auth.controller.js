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
exports.authController = void 0;
const auth_service_1 = require("./auth.service");
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = req.body;
    const result = yield auth_service_1.authService.registerUser(payload, req.file);
    res.status(201).send({
        success: true,
        message: 'User created successfully',
        token: result === null || result === void 0 ? void 0 : result.token,
        data: result === null || result === void 0 ? void 0 : result.user,
    });
});
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const getUser = req.body;
    const result = yield auth_service_1.authService.loginUser(getUser);
    res.status(201).send({
        success: true,
        message: 'User login successfully',
        token: result === null || result === void 0 ? void 0 : result.token,
        data: result === null || result === void 0 ? void 0 : result.user,
    });
});
const getAllUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield auth_service_1.authService.getAllUser();
    res.status(201).send({
        success: true,
        message: 'User login successfully',
        data: result,
    });
});
exports.authController = {
    registerUser,
    loginUser,
    getAllUser,
};
