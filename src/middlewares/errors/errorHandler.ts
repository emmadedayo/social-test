import { ErrorRequestHandler, NextFunction, Response } from 'express';
import ResponseT from '@src/interfaces/Response';
import ErrorResponse from '@src/interfaces/ErrorResponse';
import { response } from '@src/utils';

export const errorHandlerMiddleware: ErrorRequestHandler = (
  error,
  req,
  res: Response<ResponseT<null>>,
  // eslint-disable-next-line no-unused-vars
  next: NextFunction
) => {
  const statusCode = error.statusCode || 500;
  res?.status(statusCode);
  res.status(statusCode).json(
    response<any>({
      data: null,
      success: false,
      message: error.message || 'Internal Server Error',
      status: statusCode,
    })
  );
};

export default errorHandlerMiddleware;
