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
exports.furnitureController = void 0;
const furniture_service_1 = require("./furniture.service");
const createFurniture = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const payload = req.body;
        const result = yield furniture_service_1.furnitureService.createFurniture(payload, req === null || req === void 0 ? void 0 : req.file);
        res.status(201).send({
            success: true,
            message: 'Furniture Created Succesfully',
            data: result,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Furniture is not created',
            error: error,
        });
    }
});
const getFurniture = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield furniture_service_1.furnitureService.getFurniture();
        res.status(201).send({
            success: true,
            message: 'Furniture get Succesfully',
            data: result,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Furniture is not get',
            error: error,
        });
    }
});
const getSingleFurniture = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const furnitureId = req.params.furnitureId;
        const result = yield furniture_service_1.furnitureService.getSingleFurniture(furnitureId);
        res.status(201).send({
            success: true,
            message: 'Single Furniture get',
            data: result,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Single Furniture is not get',
            error: error,
        });
    }
});
const updateFurniture = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const furnitureId = req.params.furnitureId;
        const body = req.body;
        const result = yield furniture_service_1.furnitureService.updateFurniture(furnitureId, body);
        res.status(201).send({
            success: true,
            message: 'Furniture update Succesfully',
            data: result,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Furniture is not updated',
            error: error,
        });
    }
});
const deleteFurniture = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const furnitureId = req.params.furnitureId;
        const result = yield furniture_service_1.furnitureService.deleteFurniture(furnitureId);
        res.status(201).send({
            success: true,
            message: 'Furniture deleted Succesfully',
            data: result,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Furniture is not deleted',
            error: error,
        });
    }
});
exports.furnitureController = {
    createFurniture,
    getFurniture,
    getSingleFurniture,
    updateFurniture,
    deleteFurniture,
};
