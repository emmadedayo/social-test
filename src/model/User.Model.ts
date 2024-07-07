import { IUser } from '@src/interfaces/UserInterface';
import mongoose, { Model, Schema } from 'mongoose';

export const UserSchema: Schema<IUser> = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide your name'],
    },
    username: {
      type: String,
      required: [true, 'Please provide your username'],
      unique: true,
    },
    email: {
      type: String,
      required: [true, 'Please provide your email'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Please provide your password'],
    },
    profile_picture_url: {
      type: String,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const UserModel: Model<IUser & Document> = mongoose.models.User || mongoose.model<IUser & Document>('User', UserSchema);

export default UserModel;
