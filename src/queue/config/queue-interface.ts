export type IQueueOptions = {
  attempts?: number;
  delay?: number;
  removeOnComplete?: boolean;
  host: string;
  port: number;
  password: string;
};

export type IJob<T = any> = {
  data: any;
  id: number | string;
};

export interface IQueue<T = any> {
  add(data: any, options?: IQueueOptions): Promise<void>;
  process(callback: (job: IJob, done: Function) => Promise<any>): Promise<any>;
  on(event: string, callback: (...args: any[]) => void): void;
}
