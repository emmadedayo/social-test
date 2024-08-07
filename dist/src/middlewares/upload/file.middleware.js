"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadImage = exports.fileStorage = void 0;
const multer_1 = __importDefault(require("multer"));
const utils_1 = require("@src/utils");
const path_1 = __importDefault(require("path"));
exports.fileStorage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        const uploadsDir = path_1.default.join(__dirname, '..', '..', '..', 'public', 'uploads', 'posts');
        console.log(uploadsDir);
        cb(null, uploadsDir);
    },
    filename: (req, file, callback) => {
        callback(null, `${file.fieldname}-${Date.now()}${(0, utils_1.getImageExtension)(file.mimetype)}`);
    },
});
exports.uploadImage = (0, multer_1.default)({
    storage: exports.fileStorage,
    limits: {
        fileSize: 1024 * 1024 * 10,
    },
});
exports.default = { uploadImage: exports.uploadImage };
//# sourceMappingURL=file.middleware.js.map