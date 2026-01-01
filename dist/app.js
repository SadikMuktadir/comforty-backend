"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const config_1 = __importDefault(require("./app/config"));
const furniture_router_1 = __importDefault(require("./app/modules/furniture/furniture.router"));
const auth_router_1 = __importDefault(require("./app/modules/auth/auth.router"));
const cors_1 = __importDefault(require("cors"));
const review_router_1 = __importDefault(require("./app/modules/review/review.router"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: 'http://localhost:3000',
    credentials: true,
}));
app.use(express_1.default.json());
app.use('/api/v1', furniture_router_1.default);
app.use('/api/v1', auth_router_1.default);
app.use('/api/v1', review_router_1.default);
app.get('/', (req, res) => {
    res.send({
        status: true,
        message: `Server is running at ${config_1.default.port}`,
    });
});
exports.default = app;
