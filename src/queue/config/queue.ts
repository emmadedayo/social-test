import Queue from 'bull';
import dotenv from 'dotenv';
import { IJob, IQueue, IQueueOptions } from '@src/queue/config/queue-interface';
import { environmentConfig } from '@src/configs';

export class BullQueue<I = any> implements IQueue {
  private bullQueue: Queue.Queue;
  constructor(private queueName: string, options?: IQueueOptions) {
    this.bullQueue = new Queue(queueName, {
      redis: {
        host: environmentConfig.REDIS_HOST,
        port: Number(environmentConfig.REDIS_PORT),
        password: '',
      },
      ...(options || {}),
    });

    console.log(`Queue ${this.bullQueue.name} is ready`);
  }

  async add(data: any, options?: Queue.JobOptions): Promise<void> {
    await this.bullQueue.add(data, options);
  }

  async process(callback: (job: IJob<any>, done: Function) => Promise<any>): Promise<any> {
    return this.bullQueue.process(callback);
  }

  on(event: string, callback: (...args: any[]) => void): void {
    this.bullQueue.on(event, callback);
  }
}
