"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUserSchema = exports.createUserSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.createUserSchema = joi_1.default.object({
    name: joi_1.default.string().min(3).max(30).required(),
    username: joi_1.default.string().min(3).max(30).required(),
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string().min(6).required(),
    profile_picture_url: joi_1.default.string().uri().allow(null, ''),
});
exports.loginUserSchema = joi_1.default.object({
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string().min(6).required(),
});
//# sourceMappingURL=sign-up.validator.js.map