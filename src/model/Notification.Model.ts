import { INotification } from '@src/interfaces/NotificationInterface';
import mongoose, { Model, Schema } from 'mongoose';
import { NotificationType } from '@src/enum/NotificationEnum';
import mongoosePaginate from 'mongoose-paginate-v2';
import { IPost } from '@src/interfaces/PostInterface';
import { PostSchema } from '@src/model/Post.Model';

export const NotificationSchema: Schema<INotification> = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, enum: Object.values(NotificationType), required: true },
    description: { type: String, required: true },
    isRead: { type: Boolean, default: false },
  },
  { timestamps: true }
);
NotificationSchema.plugin(mongoosePaginate);
const NotificationModel: Model<INotification & Document> =
  mongoose.models.Notification || mongoose.model<INotification & Document>('Notification', NotificationSchema);
export default NotificationModel;
