"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentValidation = exports.followValidation = exports.postValidation = exports.loginUserValidation = exports.signupUserValidation = void 0;
const sign_up_validator_1 = require("@src/validation/sign-up.validator");
const validator_1 = __importDefault(require("@src/middlewares/validation/validator"));
const post_validator_1 = require("@src/validation/post.validator");
const following_validator_1 = require("@src/validation/following.validator");
const comment_validator_1 = require("@src/validation/comment.validator");
const signupUserValidation = (req, res, next) => (0, validator_1.default)(sign_up_validator_1.createUserSchema, req.body, next);
exports.signupUserValidation = signupUserValidation;
const loginUserValidation = (req, res, next) => (0, validator_1.default)(sign_up_validator_1.loginUserSchema, req.body, next);
exports.loginUserValidation = loginUserValidation;
const postValidation = (req, res, next) => (0, validator_1.default)(post_validator_1.contentSchema, req.body, next);
exports.postValidation = postValidation;
const followValidation = (req, res, next) => (0, validator_1.default)(following_validator_1.followSchema, req.body, next);
exports.followValidation = followValidation;
const commentValidation = (req, res, next) => (0, validator_1.default)(comment_validator_1.commentSchema, req.body, next);
exports.commentValidation = commentValidation;
//# sourceMappingURL=index.js.map