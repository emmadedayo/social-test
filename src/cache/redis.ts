import Redis from 'ioredis';
import { environmentConfig } from '@src/configs';

class RedisClient {
  private client: Redis;

  constructor() {
    this.client = new Redis({
      host: environmentConfig.REDIS_HOST,
      port: Number(environmentConfig.REDIS_PORT),
      password: '',
    });
  }

  async save(key: string, value: string, expirationInSeconds?: number): Promise<void> {
    if (expirationInSeconds) {
      await this.client.set(key, value, 'EX', expirationInSeconds);
    } else {
      await this.client.set(key, value);
    }
  }

  async get(key: string): Promise<string | null> {
    return this.client.get(key);
  }

  async delete(key: string): Promise<void> {
    await this.client.del(key);
  }
}

export default new RedisClient();
