import { IUser } from '@src/interfaces/UserInterface';
import { IPost } from '@src/interfaces/PostInterface';
import { Document, Schema } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

export interface IComment extends Document {
  userId: IUser['_id'];
  postId: IPost['_id'];
  comment: string;
  createdAt: Date;
  updatedAt?: Date;
  paginate: typeof mongoosePaginate.paginate;
}
