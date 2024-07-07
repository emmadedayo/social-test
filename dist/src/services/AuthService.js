"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const UserRepository_1 = __importDefault(require("@src/repositories/UserRepository"));
const utils_1 = require("@src/utils");
const token_storage_1 = __importDefault(require("@src/cache/token_storage"));
const configs_1 = require("@src/configs");
const LoginEnum_1 = require("@src/enum/LoginEnum");
class AuthService {
    userRepository;
    constructor() {
        this.userRepository = new UserRepository_1.default();
    }
    async signup(req, res, next) {
        const user = req.body;
        user.password = await bcrypt_1.default.hash(user.password, 10);
        await this.userRepository.createUser(user);
        return res.status(201).json((0, utils_1.response)({
            data: null,
            success: true,
            message: 'User created successfully',
            status: 201,
        }));
    }
    async login(req, res, next) {
        const dto = req.body;
        const user = await this.userRepository.getUserByEmail(dto.email, []);
        if (!user) {
            return res.status(404).json((0, utils_1.response)({
                data: null,
                success: false,
                message: 'User not found',
                status: 404,
            }));
        }
        const isPasswordValid = await bcrypt_1.default.compare(dto.password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json((0, utils_1.response)({
                data: null,
                success: false,
                message: 'Invalid credentials',
                status: 401,
            }));
        }
        const tokenModel = new token_storage_1.default(user._id);
        const token = await tokenModel.generateToken({ user: user }, configs_1.environmentConfig.JWT_TOKEN_SECRET, {
            expiresIn: '1h',
        });
        await tokenModel.saveToken(user._id, LoginEnum_1.TokenType.LOGIN, token);
        await tokenModel.getToken(user._id, LoginEnum_1.TokenType.LOGIN);
        return res.status(200).json((0, utils_1.response)({
            data: { token: token, user: user },
            success: true,
            message: 'Login successful',
            status: 200,
        }));
    }
}
exports.AuthService = AuthService;
//# sourceMappingURL=AuthService.js.map