import ResponseT from '@src/interfaces/Response';

export interface ErrorResponse extends ResponseT<null> {
  stack?: string;
}

export default ErrorResponse;
