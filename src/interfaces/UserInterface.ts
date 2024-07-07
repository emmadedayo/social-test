import { Request } from 'express';
import { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  id: string;
  name: string;
  username: string;
  email: string;
  password?: string;
  profile_picture_url?: string;
}

export interface IRequestUser extends Request {
  user: IUser;
}

export interface IAuthRequest extends Request {
  headers: { authorization?: string; Authorization?: string };
  cookies: { authToken?: string };
  user?: IUser;
}

export interface IAuthRefreshTokenRequest extends Request {
  headers: { authorization?: string; Authorization?: string };
  cookies: { authToken?: string };
  accessToken?: string;
  refreshToken?: string;
}
