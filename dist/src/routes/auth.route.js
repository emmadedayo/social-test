"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const AuthController_1 = __importDefault(require("@src/controllers/AuthController"));
const validation_1 = require("@src/validation");
const router = express_1.default.Router();
const authController = new AuthController_1.default();
router.post('/signup', validation_1.signupUserValidation, authController.signup);
router.post('/login', validation_1.loginUserValidation, authController.login);
module.exports = router;
//# sourceMappingURL=auth.route.js.map