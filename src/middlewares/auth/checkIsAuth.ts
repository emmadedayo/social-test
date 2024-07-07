import jwt, { VerifyErrors } from 'jsonwebtoken';
import { NextFunction, Response } from 'express';
import createHttpError, { InternalServerError } from 'http-errors';
import { environmentConfig } from '@src/configs';
import UserModel from '@src/model/User.Model';
import { IAuthRequest, IUser } from '@src/interfaces/UserInterface';

export const isAuth = async (req: IAuthRequest, res: Response, next: NextFunction) => {
  const authHeader = (req && req.headers.authorization) || (req && req.headers.Authorization);
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) {
    return next(createHttpError(401, 'Unable to validate your credentials'));
  }

  jwt.verify(
    token,
    environmentConfig.JWT_TOKEN_SECRET as jwt.Secret,
    async (err: VerifyErrors | null, decodedUser: any) => {
      if (err) {
        const errorMessage = err.name === 'JsonWebTokenError' ? 'Authorization Failed' : err.message;
        return next(createHttpError(403, errorMessage));
      }
      try {
        const decodedUserInDB = await UserModel.findOne({ _id: decodedUser?.user._id });
        if (!decodedUserInDB) {
          return next(createHttpError(403, `Authorization Failed`));
        }
        req.user = decodedUserInDB as IUser;
        next();
      } catch (error) {
        return next(InternalServerError);
      }
    }
  );
};
export default { isAuth };
