import { IUser } from '@src/interfaces/UserInterface';

export interface AuthenticatedRequest extends Request {
  user: IUser;
  files?: any;
}
