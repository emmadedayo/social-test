"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const utils_1 = require("../utils");
const router = express_1.default.Router();
router.get('/health-checker', (req, res) => {
    const message = 'Welcome to the Backend Engineer Assessment for a Social Media API—a challenge to design and build a scalable, resilient backend API for a vibrant social media platform.';
    res.send((0, utils_1.response)({ data: null, success: false, message, status: 200 }));
});
module.exports = router;
//# sourceMappingURL=index.js.map