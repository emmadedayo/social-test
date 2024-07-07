import mongoose, { ConnectOptions, Error } from 'mongoose';

// Connecting to MongoDB(Connecting to the Database)
export const connectDB = (MONGODB_URI: any) => {
  mongoose.connection.on('connected', () => {
    console.log('MongoDB database connection established successfully');
  });

  mongoose.connection.on('reconnected', () => {
    console.log('Mongo Connection Reestablished');
  });

  mongoose.connection.on('error', (error: Error) => {
    console.log('MongoDB connection error. Please make sure MongoDB is running: ');
    console.log(`Mongo Connection ERROR: ${error}`);
  });

  mongoose.connection.on('close', () => {
    console.log('Mongo Connection Closed...');
  });

  mongoose.connection.on('disconnected', () => {
    console.log('MongoDB database connection is disconnected...');
    console.log('Trying to reconnect to Mongo ...');
    setTimeout(() => {
      mongoose.connect(MONGODB_URI, {
        keepAlive: true,
        socketTimeoutMS: 3000,
        connectTimeoutMS: 3000,
        useNewUrlParser: true,
        useUnifiedTopology: true,
      } as ConnectOptions);
    }, 3000);
  });

  process.on('SIGINT', () => {
    mongoose.connection.close(() => {
      console.log('MongoDB database connection is disconnected due to app termination...');
      process.exit(0); // close database connection
    });
  });

  mongoose
    .connect(MONGODB_URI, {
      keepAlive: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as ConnectOptions)
    .then((r) => r)
    .catch((e) => e);

  return mongoose.connect(MONGODB_URI);
};

export default connectDB;
