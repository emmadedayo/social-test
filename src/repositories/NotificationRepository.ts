import { BaseRepository } from '@src/repositories/BaseRepository';
import { INotification } from '@src/interfaces/NotificationInterface';
import NotificationModel from '@src/model/Notification.Model';
import { FilterQuery } from 'mongoose';

class NotificationRepository extends BaseRepository<INotification & Document> {
  constructor() {
    super(NotificationModel);
  }

  /**
   * Create a new user
   */
  async createNotification(data: Partial<INotification>): Promise<INotification> {
    return this.create(data as Partial<INotification & Document>);
  }

  //find
  async findNotification(
    query: FilterQuery<INotification>,
    page: number,
    limit: number
  ): Promise<{
    meta: {
      next: string;
      previous: string;
      lastPage: string;
      totalPages: any;
      currentPage: any;
      totalDocs: any;
    };
    results: any;
  }> {
    return this.find(query, page, limit);
  }
}
export default NotificationRepository;
