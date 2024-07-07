import express from 'express';

import { isAuth } from '@src/middlewares';
import AuthController from '@src/controllers/AuthController';
import { loginUserValidation, signupUserValidation } from '@src/validation';

const router = express.Router();
const authController = new AuthController();
router.post('/signup', signupUserValidation, authController.signup);
router.post('/login', loginUserValidation, authController.login);

export = router;
