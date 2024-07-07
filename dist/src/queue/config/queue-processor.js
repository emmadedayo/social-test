"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IProcessor = void 0;
class IProcessor {
    queue;
    constructor(queue) {
        this.queue = queue;
    }
    lifeCycle() {
        this.queue.on('waiting', (jobId) => console.log(`Job ${jobId} is waiting`));
        this.queue.on('active', (job) => console.log(`Job ${job.id} is active`));
        this.queue.on('completed', (job, result) => console.log(`Job ${job.id} completed with result ${JSON.stringify(result)}`));
        this.queue.on('failed', (job, err) => console.log(`Job ${job.id} failed with error ${err}`));
    }
}
exports.IProcessor = IProcessor;
//# sourceMappingURL=queue-processor.js.map