"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandlerMiddleware = void 0;
const utils_1 = require("@src/utils");
const errorHandlerMiddleware = (error, req, res, next) => {
    const statusCode = error.statusCode || 500;
    res?.status(statusCode);
    res.status(statusCode).json((0, utils_1.response)({
        data: null,
        success: false,
        message: error.message || 'Internal Server Error',
        status: statusCode,
    }));
};
exports.errorHandlerMiddleware = errorHandlerMiddleware;
exports.default = exports.errorHandlerMiddleware;
//# sourceMappingURL=errorHandler.js.map