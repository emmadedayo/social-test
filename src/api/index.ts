import express from 'express';

import authRoutes from '@src/routes/auth.route';
import postRoutes from '@src/routes/post.route';
import healthCheckRoute from '@src/routes';

const router = express.Router();

router.use('/', healthCheckRoute);
router.use('/auth', authRoutes);
router.use('/post', postRoutes);

export default router;
