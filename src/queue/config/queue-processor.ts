import { IJob, IQueue } from '@src/queue/config/queue-interface';

export abstract class IProcessor {
  protected constructor(protected queue: IQueue) {}

  abstract start(): Promise<void>;

  lifeCycle() {
    this.queue.on('waiting', (jobId: any) => console.log(`Job ${jobId} is waiting`));

    this.queue.on('active', (job: IJob) => console.log(`Job ${job.id} is active`));

    this.queue.on('completed', (job: IJob, result: any) =>
      console.log(`Job ${job.id} completed with result ${JSON.stringify(result)}`)
    );

    this.queue.on('failed', (job: IJob, err: any) => console.log(`Job ${job.id} failed with error ${err}`));
  }
}
