import { IUser } from '@src/interfaces/UserInterface';
import { NotificationType } from '@src/enum/NotificationEnum';
import mongoosePaginate from 'mongoose-paginate-v2';
import { Document, Schema } from 'mongoose';

export interface INotification extends Document {
  userId: IUser['_id'];
  type: NotificationType;
  description: string;
  createdAt: Date;
  isRead: boolean;
  paginate: typeof mongoosePaginate.paginate;
}
