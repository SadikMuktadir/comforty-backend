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
exports.furnitureService = void 0;
const sendImageToCloudinary_1 = require("../../utils/hosting/sendImageToCloudinary");
const furniture_model_1 = __importDefault(require("./furniture.model"));
const createFurniture = (payload, file) => __awaiter(void 0, void 0, void 0, function* () {
    let imageUrl;
    if (file) {
        const imageName = `${payload === null || payload === void 0 ? void 0 : payload.name}`;
        const path = file === null || file === void 0 ? void 0 : file.path;
        const uploadImage = yield (0, sendImageToCloudinary_1.sendImageToCloudinary)(imageName, path);
        imageUrl = uploadImage === null || uploadImage === void 0 ? void 0 : uploadImage.secure_url;
    }
    const furnitureData = Object.assign(Object.assign({}, payload), { image: imageUrl });
    const result = yield furniture_model_1.default.create(furnitureData);
    return result;
});
const getFurniture = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield furniture_model_1.default.find();
    return result;
});
const getSingleFurniture = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield furniture_model_1.default.findById(id);
    return result;
});
const updateFurniture = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield furniture_model_1.default.findByIdAndUpdate(id, data, { new: true });
    return result;
});
const deleteFurniture = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield furniture_model_1.default.findByIdAndDelete(id);
    return result;
});
exports.furnitureService = {
    createFurniture,
    getFurniture,
    getSingleFurniture,
    updateFurniture,
    deleteFurniture,
};
