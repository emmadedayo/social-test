"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AuthService_1 = require("@src/services/AuthService");
class AuthController {
    authService;
    constructor() {
        this.authService = new AuthService_1.AuthService();
        this.signup = this.signup.bind(this);
        this.login = this.login.bind(this);
    }
    async signup(req, res, next) {
        return this.authService.signup(req, res, next);
    }
    async login(req, res, next) {
        return this.authService.login(req, res, next);
    }
}
exports.default = AuthController;
//# sourceMappingURL=AuthController.js.map