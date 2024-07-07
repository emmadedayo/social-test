import app from '@src/app';
import { connectDB } from '@src/configs/db.config';
import { environmentConfig } from '@src/configs';

const start = async () => {
  try {
    await connectDB(environmentConfig.MONGODB_CONNECTION_STRING);

    console.log('MongoDB database connection established successfully to... ');

    app?.listen(environmentConfig.PORT, () => {
      console.log(`Listening: http://localhost:${environmentConfig.PORT}`);
    });
  } catch (error) {
    console.log('MongoDB connection error. Please make sure MongoDB is running: ');
  }
};
start()
  .then((r) => r)
  .catch((e) => e);
