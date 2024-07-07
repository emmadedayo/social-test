import mongoose, { Model, Schema } from 'mongoose';
import { IComment } from '@src/interfaces/CommentInterface';
import mongoosePaginate from 'mongoose-paginate-v2';
import { PostSchema } from '@src/model/Post.Model';

export const CommentSchema: Schema<IComment> = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    postId: { type: Schema.Types.ObjectId, ref: 'Post', required: true },
    comment: { type: String, required: true },
  },
  { timestamps: true, toJSON: { virtuals: true } }
);
CommentSchema.plugin(mongoosePaginate);
const CommentModel: Model<IComment & Document> =
  mongoose.models.Comment || mongoose.model<IComment & Document>('Comment', CommentSchema);
export default CommentModel;
