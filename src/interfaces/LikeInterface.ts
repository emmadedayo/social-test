import { IPost } from '@src/interfaces/PostInterface';
import { IUser } from '@src/interfaces/UserInterface';
import { Document, Schema } from 'mongoose';

export interface ILike extends Document {
  userId: IUser['_id'];
  postId: IPost['_id'];
  createdAt: Date;
}
