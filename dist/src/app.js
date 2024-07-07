"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const dotenv_safe_1 = __importDefault(require("dotenv-safe"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const api_1 = __importDefault(require("@src/api"));
const middlewares_1 = require("@src/middlewares");
const notFound_1 = __importDefault(require("@src/middlewares/errors/notFound"));
const mongo_validator_1 = __importDefault(require("@src/middlewares/mongo/mongo-validator"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
dotenv_safe_1.default.config();
const limiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
    message: "Too many requests, please try again later.",
});
const app = (0, express_1.default)();
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
app.use((0, helmet_1.default)({
    crossOriginResourcePolicy: false,
    crossOriginEmbedderPolicy: false,
    crossOriginOpenerPolicy: false,
}));
app.use(limiter);
app.use((0, cors_1.default)());
app.use('/api/v1', api_1.default);
app.use(notFound_1.default);
app.use(mongo_validator_1.default);
app.use(middlewares_1.errorHandlerMiddleware);
exports.default = app;
//# sourceMappingURL=app.js.map