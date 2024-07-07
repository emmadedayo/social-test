"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const redis_1 = __importDefault(require("./redis"));
const crypto_1 = __importDefault(require("crypto"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class TokenStorage {
    emailVerificationExpiresToken;
    emailVerificationToken;
    resetPasswordExpires;
    resetPasswordToken;
    userId;
    accessToken;
    refreshToken;
    constructor(userId) {
        this.userId = userId;
    }
    async generatePasswordReset() {
        this.resetPasswordToken = crypto_1.default.randomBytes(32).toString('hex');
        this.resetPasswordExpires = new Date(Date.now() + 3600000).toISOString();
        await redis_1.default.save(`resetPassword:${this.userId}`, JSON.stringify({
            resetPasswordToken: this.resetPasswordToken,
            resetPasswordExpires: this.resetPasswordExpires,
        }), 3600);
    }
    async generateEmailVerificationToken() {
        this.emailVerificationToken = crypto_1.default.randomBytes(32).toString('hex');
        this.emailVerificationExpiresToken = new Date(Date.now() + 3600000).toISOString();
        await redis_1.default.save(`emailVerification:${this.userId}`, JSON.stringify({
            emailVerificationToken: this.emailVerificationToken,
            emailVerificationExpiresToken: this.emailVerificationExpiresToken,
        }), 3600);
    }
    async generateToken(payload, secret, signOptions) {
        return new Promise((resolve, reject) => {
            jsonwebtoken_1.default.sign(payload, secret, signOptions, (err, encoded) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(encoded);
                }
            });
        });
    }
    async getToken(userId, tokenType) {
        return await redis_1.default.get(`${tokenType}:${userId}`);
    }
    async deleteToken(userId, tokenType) {
        await redis_1.default.delete(`${tokenType}:${userId}`);
    }
    async saveToken(userId, tokenType, tokenData) {
        await redis_1.default.save(`${tokenType}:${userId}`, tokenData, 3600);
    }
}
exports.default = TokenStorage;
//# sourceMappingURL=token_storage.js.map