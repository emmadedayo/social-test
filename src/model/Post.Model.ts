import mongoose, { Model, Schema } from 'mongoose';
import { IPost } from '@src/interfaces/PostInterface';
import mongoosePaginate from 'mongoose-paginate-v2';

export const PostSchema: Schema<IPost> = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    media_url: [String],
    content: {
      type: String,
      // required: [false, 'Please provide your content'],
    },
  },
  { timestamps: true, toJSON: { virtuals: true } }
);
PostSchema.virtual('likes_count', {
  ref: 'Like',
  localField: '_id',
  foreignField: 'postId',
  count: true,
});
PostSchema.virtual('comments_count', {
  ref: 'Comment',
  localField: '_id',
  foreignField: 'postId',
  count: true,
});
PostSchema.plugin(mongoosePaginate);
const PostModel: Model<IPost & Document> = mongoose.models.Post || mongoose.model<IPost & Document>('Post', PostSchema);
export default PostModel;
