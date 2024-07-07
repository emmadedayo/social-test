import dotenv from 'dotenv-safe';

dotenv.config();

export const environmentConfig = {
  MONGODB_CONNECTION_STRING: process.env.MONGODB_CONNECTION_STRING,
  JWT_TOKEN_SECRET: process.env.JWT_TOKEN_SECRET as string,
  API_VERSION: process.env.API_VERSION,
  JWT_EXPIRE_TIME: process.env.JWT_EXPIRE_TIME,
  PORT: process.env.PORT || 3000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  REDIS_HOST: process.env.REDIS_HOST,
  REDIS_PORT: process.env.REDIS_PORT,
};

export default environmentConfig;
