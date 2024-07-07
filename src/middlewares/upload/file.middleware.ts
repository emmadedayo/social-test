/* eslint-disable no-unused-vars */
import { Request, Express } from 'express';
import multer from 'multer';

import { getImageExtension } from '@src/utils';
import path from 'path';

type DestinationCallback = (error: Error | null, destination: string) => void;
type FileNameCallback = (error: Error | null, filename: string) => void;

// Configuring and validating the upload
export const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadsDir = path.join(__dirname, '..', '..', '..', 'public', 'uploads', 'posts');
    console.log(uploadsDir);
    cb(null, uploadsDir);
  },
  filename: (req: Request, file: Express.Multer.File, callback: FileNameCallback): void => {
    callback(null, `${file.fieldname}-${Date.now()}${getImageExtension(file.mimetype)}`);
  },
});

// Initialize upload variable
export const uploadImage = multer({
  storage: fileStorage,
  limits: {
    fileSize: 1024 * 1024 * 10, // accept files up 10 mgb
  },
});

export default { uploadImage };
