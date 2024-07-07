export interface ResponseT<T> {
  data: T | null;
  success: boolean;
  message: string;
  status: number;
}

export default ResponseT;
