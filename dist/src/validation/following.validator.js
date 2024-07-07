"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.followSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.followSchema = joi_1.default.object({
    following_id: joi_1.default.string().allow('').required(),
});
//# sourceMappingURL=following.validator.js.map