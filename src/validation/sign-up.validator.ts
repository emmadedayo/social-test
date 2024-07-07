import Joi from 'joi';
import { CreateUserInput } from '@src/dto/signup-dto';

export const createUserSchema: Joi.ObjectSchema<CreateUserInput> = Joi.object<CreateUserInput>({
  name: Joi.string().min(3).max(30).required(),
  username: Joi.string().min(3).max(30).required(),
  email: Joi.string().trim().email().required(),
  password: Joi.string().min(6).required(),
  profile_picture_url: Joi.string().uri().allow(null, ''),
});

export const loginUserSchema: Joi.ObjectSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});
