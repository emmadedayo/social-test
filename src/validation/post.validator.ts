import Joi from 'joi';
import { CreateUserInput } from '@src/dto/signup-dto';

export const contentSchema = Joi.object({
  content: Joi.string().allow('').required(),
});
