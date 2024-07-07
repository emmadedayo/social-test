"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.contentSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.contentSchema = joi_1.default.object({
    content: joi_1.default.string().allow('').required(),
});
//# sourceMappingURL=post.validator.js.map