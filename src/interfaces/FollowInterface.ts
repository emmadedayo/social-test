import { IUser } from '@src/interfaces/UserInterface';
import { Document, Schema } from 'mongoose';

export interface IFollow extends Document {
  followerId: IUser['_id'];
  userId: IUser['_id'];
  createdAt: Date;
}
