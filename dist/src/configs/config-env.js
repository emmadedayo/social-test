"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.environmentConfig = void 0;
const dotenv_safe_1 = __importDefault(require("dotenv-safe"));
dotenv_safe_1.default.config();
exports.environmentConfig = {
    MONGODB_CONNECTION_STRING: process.env.MONGODB_CONNECTION_STRING,
    JWT_TOKEN_SECRET: process.env.JWT_TOKEN_SECRET,
    API_VERSION: process.env.API_VERSION,
    JWT_EXPIRE_TIME: process.env.JWT_EXPIRE_TIME,
    PORT: process.env.PORT || 3000,
    NODE_ENV: process.env.NODE_ENV || 'development',
    REDIS_HOST: process.env.REDIS_HOST,
    REDIS_PORT: process.env.REDIS_PORT,
};
exports.default = exports.environmentConfig;
//# sourceMappingURL=config-env.js.map