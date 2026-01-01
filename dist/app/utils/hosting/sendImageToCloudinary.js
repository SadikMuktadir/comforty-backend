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
exports.upload = exports.sendImageToCloudinary = void 0;
const cloudinary_1 = require("cloudinary");
const dotenv_1 = __importDefault(require("dotenv"));
const multer_1 = __importDefault(require("multer"));
const fs_1 = __importDefault(require("fs"));
dotenv_1.default.config();
// Proper async function that returns Cloudinary upload result
const sendImageToCloudinary = (imageName, path) => __awaiter(void 0, void 0, void 0, function* () {
    // Configuration
    cloudinary_1.v2.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
    });
    try {
        const uploadResult = yield cloudinary_1.v2.uploader.upload(path, {
            public_id: imageName,
        });
        // Delete local file after upload
        fs_1.default.unlink(path, (err) => {
            if (err)
                console.error('Failed to delete local file:', err);
        });
        // Return Cloudinary URL
        return { secure_url: uploadResult.secure_url };
    }
    catch (error) {
        console.error('Cloudinary upload error:', error);
        throw error; // propagate the error
    }
});
exports.sendImageToCloudinary = sendImageToCloudinary;
// multer setup
const storage = multer_1.default.diskStorage({
    destination: '/tmp',
    filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});
exports.upload = (0, multer_1.default)({ storage });
