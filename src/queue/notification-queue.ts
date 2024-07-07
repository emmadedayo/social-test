import { IProcessor } from '@src/queue/config/queue-processor';
import { IQueue } from '@src/queue/config/queue-interface';
import NotificationRepository from '@src/repositories/NotificationRepository';
import { NotificationType } from '@src/enum/NotificationEnum';
import UserRepository from '@src/repositories/UserRepository';
import DoneCallback = jest.DoneCallback;

export class NotificationProcessor extends IProcessor {
  private notificationRepository: NotificationRepository;
  private userRepository: UserRepository;
  constructor(queue: IQueue) {
    super(queue);
    this.queue = queue;
    this.notificationRepository = new NotificationRepository();
    this.userRepository = new UserRepository();
  }
  async start() {
    this.lifeCycle();

    return this.queue.process(async (job, done) => {
      try {
        const { type, userId, followerId, postUserId } = job.data;

        let description: string;
        let notificationRecipientId: number;

        const user = await this.userRepository.findUserById(userId);

        switch (type) {
          case NotificationType.FOLLOW:
            notificationRecipientId = followerId!;
            description = `${user?.username} started following you`;
            break;
          case NotificationType.LIKE:
          case NotificationType.COMMENT:
          case NotificationType.MENTION:
            notificationRecipientId = postUserId!;
            description = `${user?.username} ${
              type === NotificationType.LIKE
                ? 'liked'
                : type === NotificationType.COMMENT
                ? 'commented on'
                : 'mentioned you in'
            } your post`;
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
      } catch (error) {
        done(error as Error);
      }
    });
  }
}
