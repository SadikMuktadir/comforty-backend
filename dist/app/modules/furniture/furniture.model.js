"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const furnitureSchema = new mongoose_1.Schema({
    image: {
        type: String,
    },
    name: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
    },
    price: {
        type: Number,
    },
}, {
    timestamps: true,
});
const Furniture = (0, mongoose_1.model)('Furniture', furnitureSchema);
exports.default = Furniture;
