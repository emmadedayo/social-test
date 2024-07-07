import express, { Request, Response } from 'express';

import { response } from '../utils';
import ResponseT from '@src/interfaces/Response';

const router = express.Router();

// GET home page.
router.get('/health-checker', (req: Request, res: Response<ResponseT<null>>) => {
  const message =
    'Welcome to the Backend Engineer Assessment for a Social Media API—a challenge to design and build a scalable, resilient backend API for a vibrant social media platform.';
  res.send(response<null>({ data: null, success: false, message, status: 200 }));
});

export = router;
