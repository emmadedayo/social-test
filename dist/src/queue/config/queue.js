"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BullQueue = void 0;
const bull_1 = __importDefault(require("bull"));
const configs_1 = require("@src/configs");
class BullQueue {
    queueName;
    bullQueue;
    constructor(queueName, options) {
        this.queueName = queueName;
        this.bullQueue = new bull_1.default(queueName, {
            redis: {
                host: configs_1.environmentConfig.REDIS_HOST,
                port: Number(configs_1.environmentConfig.REDIS_PORT),
                password: '',
            },
            ...(options || {}),
        });
        console.log(`Queue ${this.bullQueue.name} is ready`);
    }
    async add(data, options) {
        await this.bullQueue.add(data, options);
    }
    async process(callback) {
        return this.bullQueue.process(callback);
    }
    on(event, callback) {
        this.bullQueue.on(event, callback);
    }
}
exports.BullQueue = BullQueue;
//# sourceMappingURL=queue.js.map