import { Response } from 'express';
import { UserLoginData } from './userLoginSchema';
import { UserRegisterData } from './userRegisterSchema';
import { RestorePasswordInterface } from './restorePasswordSchema';
import { errorHandler } from '../utils';
import * as Joi from 'joi';

type Schema =
  | Joi.ObjectSchema<UserLoginData>
  | Joi.ObjectSchema<UserRegisterData>
  | Joi.ObjectSchema<RestorePasswordInterface>;

type UserData = UserLoginData | UserRegisterData | RestorePasswordInterface;

export const dataValidation = (res: Response, schema: Schema, data: UserData) => {
  const userValidateCandidate = schema.validate(data);
  if (userValidateCandidate.error) {
    errorHandler(res, 409, `${userValidateCandidate.error.details[0].path[0]} validation error`);
    return false;
  }
  return true;
};
