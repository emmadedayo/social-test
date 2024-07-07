"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseRepository_1 = require("@src/repositories/BaseRepository");
const Notification_Model_1 = __importDefault(require("@src/model/Notification.Model"));
class NotificationRepository extends BaseRepository_1.BaseRepository {
    constructor() {
        super(Notification_Model_1.default);
    }
    async createNotification(data) {
        return this.create(data);
    }
    async findNotification(query, page, limit) {
        return this.find(query, page, limit);
    }
}
exports.default = NotificationRepository;
//# sourceMappingURL=NotificationRepository.js.map