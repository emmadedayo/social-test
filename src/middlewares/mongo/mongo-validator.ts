import { ErrorRequestHandler, Request, Response, NextFunction } from 'express';
import { MongoError } from 'mongodb'; // or import mongoose error type if using Mongoose
// import { logger } from './logger'; // import your logging module

// Custom Error Type (Optional, for better organization)
interface MongoDbError extends Error {
  status?: number;
}

const mongoDbErrorHandler: ErrorRequestHandler = (
  err: MongoDbError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof MongoError) {
    // or check for mongoose error type
    //logger.error('MongoDB Error:', err); // Log the error for debugging

    // Handle Specific Errors:
    if (err.code === 11000) {
      // Duplicate key error
      return res.status(409).json({ error: 'Duplicate key error' });
    } else if (err.name === 'ValidationError') {
      // Mongoose validation error
      return res.status(400).json({ error: err.message }); // or format errors as needed
    }
    return res.status(500).json({ error: 'Database error' }); // Don't leak internal details
  }

  // If not a MongoDB error, pass it to the next middleware (likely a generic error handler)
  next(err);
};

export default mongoDbErrorHandler;
