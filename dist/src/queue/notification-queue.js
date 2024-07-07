"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationProcessor = void 0;
const queue_processor_1 = require("@src/queue/config/queue-processor");
const NotificationRepository_1 = __importDefault(require("@src/repositories/NotificationRepository"));
const NotificationEnum_1 = require("@src/enum/NotificationEnum");
const UserRepository_1 = __importDefault(require("@src/repositories/UserRepository"));
class NotificationProcessor extends queue_processor_1.IProcessor {
    notificationRepository;
    userRepository;
    constructor(queue) {
        super(queue);
        this.queue = queue;
        this.notificationRepository = new NotificationRepository_1.default();
        this.userRepository = new UserRepository_1.default();
    }
    async start() {
        this.lifeCycle();
        return this.queue.process(async (job, done) => {
            try {
                const { type, userId, followerId, postUserId } = job.data;
                let description;
                let notificationRecipientId;
                const user = await this.userRepository.findUserById(userId);
                switch (type) {
                    case NotificationEnum_1.NotificationType.FOLLOW:
                        notificationRecipientId = followerId;
                        description = `${user?.username} started following you`;
                        break;
                    case NotificationEnum_1.NotificationType.LIKE:
                    case NotificationEnum_1.NotificationType.COMMENT:
                    case NotificationEnum_1.NotificationType.MENTION:
                        notificationRecipientId = postUserId;
                        description = `${user?.username} ${type === NotificationEnum_1.NotificationType.LIKE
                            ? 'liked'
                            : type === NotificationEnum_1.NotificationType.COMMENT
                                ? 'commented on'
                                : 'mentioned you in'} your post`;
                        break;
                    default:
                        throw new Error(`Unknown notification type: ${type}`);
                }
                await this.notificationRepository.createNotification({
                    userId: notificationRecipientId,
                    description,
                    type,
                    isRead: false,
                });
                done(null, job.data);
            }
            catch (error) {
                done(error);
            }
        });
    }
}
exports.NotificationProcessor = NotificationProcessor;
//# sourceMappingURL=notification-queue.js.map