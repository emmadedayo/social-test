import ResponseT from '@src/interfaces/Response';

export const response = <T>({ data, success, message, status }: ResponseT<T>) => {
  const responseObj: any = {
    success,
    message,
    status,
  };

  if (data !== null) {
    responseObj.data = data;
  }

  return responseObj;
};

export default response;
