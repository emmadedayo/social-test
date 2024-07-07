import mongoose, { Model, Schema } from 'mongoose';
import { ILike } from '@src/interfaces/LikeInterface';
import { IUser } from '@src/interfaces/UserInterface';
import { UserSchema } from '@src/model/User.Model';

export const LikeSchema: Schema<ILike> = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    postId: { type: Schema.Types.ObjectId, ref: 'Post', required: true },
  },
  { timestamps: true } // Automatically adds createdAt field
);

const LikeModel: Model<ILike & Document> = mongoose.models.Like || mongoose.model<ILike & Document>('Like', LikeSchema);

export default LikeModel;
