"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ioredis_1 = __importDefault(require("ioredis"));
const configs_1 = require("@src/configs");
class RedisClient {
    client;
    constructor() {
        this.client = new ioredis_1.default({
            host: configs_1.environmentConfig.REDIS_HOST,
            port: Number(configs_1.environmentConfig.REDIS_PORT),
            password: '',
        });
    }
    async save(key, value, expirationInSeconds) {
        if (expirationInSeconds) {
            await this.client.set(key, value, 'EX', expirationInSeconds);
        }
        else {
            await this.client.set(key, value);
        }
    }
    async get(key) {
        return this.client.get(key);
    }
    async delete(key) {
        await this.client.del(key);
    }
}
exports.default = new RedisClient();
//# sourceMappingURL=redis.js.map