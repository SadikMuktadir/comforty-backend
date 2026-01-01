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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authService = void 0;
const sendImageToCloudinary_1 = require("../../utils/hosting/sendImageToCloudinary");
const bcrypt_1 = __importDefault(require("bcrypt"));
const auth_model_1 = __importDefault(require("./auth.model"));
const config_1 = __importDefault(require("../../config"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const registerUser = (payload, file) => __awaiter(void 0, void 0, void 0, function* () {
    if (!payload.password) {
        throw new Error('Password is required');
    }
    const hashedPassword = yield bcrypt_1.default.hash(payload.password, 12);
    let imageUrl;
    if (file) {
        const imageName = `${payload === null || payload === void 0 ? void 0 : payload.name}`;
        const path = file === null || file === void 0 ? void 0 : file.path;
        const uploadImage = yield (0, sendImageToCloudinary_1.sendImageToCloudinary)(imageName, path);
        imageUrl = uploadImage === null || uploadImage === void 0 ? void 0 : uploadImage.secure_url;
    }
    const userData = Object.assign(Object.assign({}, payload), { password: hashedPassword, image: imageUrl });
    const result = yield auth_model_1.default.create(userData);
    const token = jsonwebtoken_1.default.sign({
        image: result === null || result === void 0 ? void 0 : result.image,
        email: result === null || result === void 0 ? void 0 : result.email,
        name: result === null || result === void 0 ? void 0 : result.name,
        role: result === null || result === void 0 ? void 0 : result.role,
    }, config_1.default.jwt_secret || 'secret-token', { expiresIn: '30d' });
    return { token, user: result };
});
const loginUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield auth_model_1.default.findOne({
        email: payload === null || payload === void 0 ? void 0 : payload.email,
    }).select('+password');
    if (!user) {
        throw new Error('User not found');
    }
    const isPasswordMatched = yield bcrypt_1.default.compare(payload === null || payload === void 0 ? void 0 : payload.password, user === null || user === void 0 ? void 0 : user.password);
    if (!isPasswordMatched) {
        throw new Error('Invalid credentials');
    }
    if (!config_1.default.jwt_secret) {
        throw new Error('JWT_SECRET is not defined');
    }
    const token = jsonwebtoken_1.default.sign({
        image: user === null || user === void 0 ? void 0 : user.image,
        email: user === null || user === void 0 ? void 0 : user.email,
        name: user === null || user === void 0 ? void 0 : user.name,
        role: user === null || user === void 0 ? void 0 : user.role,
    }, config_1.default.jwt_secret || 'secret-token', { expiresIn: '30d' });
    return { token, user };
});
const getAllUser = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield auth_model_1.default.find();
    return result;
});
exports.authService = {
    registerUser,
    loginUser,
    getAllUser,
};
