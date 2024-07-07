"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.response = void 0;
const response = ({ data, success, message, status }) => {
    const responseObj = {
        success,
        message,
        status,
    };
    if (data !== null) {
        responseObj.data = data;
    }
    return responseObj;
};
exports.response = response;
exports.default = exports.response;
//# sourceMappingURL=response.js.map