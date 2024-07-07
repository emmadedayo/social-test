import { Document } from 'mongoose';
import { IUser } from '@src/interfaces/UserInterface';
import mongoosePaginate from 'mongoose-paginate-v2';

export interface IPost extends Document {
  user_id: IUser['_id'];
  content?: string;
  media_url?: string[];
  createdAt: Date;
  updatedAt?: Date;
  paginate: typeof mongoosePaginate.paginate;
  likes_count: number;
  comments_count: number;
}
