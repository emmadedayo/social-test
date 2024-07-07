import mongoose, { Model, Schema } from 'mongoose';
import { IFollow } from '@src/interfaces/FollowInterface';
import mongoosePaginate from 'mongoose-paginate-v2';
import { IPost } from '@src/interfaces/PostInterface';
import { PostSchema } from '@src/model/Post.Model';

export const FollowSchema: Schema<IFollow> = new Schema(
  {
    followerId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
);
PostSchema.plugin(mongoosePaginate);
const PostModel: Model<IFollow & Document> =
  mongoose.models.Follow || mongoose.model<IFollow & Document>('Follow', FollowSchema);
export default PostModel;
