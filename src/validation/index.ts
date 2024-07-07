import { RequestHandler } from 'express';
import { createUserSchema, loginUserSchema } from '@src/validation/sign-up.validator';
import validator from '@src/middlewares/validation/validator';
import { contentSchema } from '@src/validation/post.validator';
import { followSchema } from '@src/validation/following.validator';
import { commentSchema } from '@src/validation/comment.validator';

export const signupUserValidation: RequestHandler = (req, res, next) => validator(createUserSchema, req.body, next);

export const loginUserValidation: RequestHandler = (req, res, next) => validator(loginUserSchema, req.body, next);

export const postValidation: RequestHandler = (req, res, next) => validator(contentSchema, req.body, next);

export const followValidation: RequestHandler = (req, res, next) => validator(followSchema, req.body, next);

export const commentValidation: RequestHandler = (req, res, next) => validator(commentSchema, req.body, next);
