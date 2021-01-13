import { Response } from 'express';
import { UserLoginData } from './userLoginSchema';
import { UserRegisterData } from './userRegisterSchema';
import { errorHandler } from '../utils';
import * as Joi from 'joi';

type Schema = Joi.ObjectSchema<UserLoginData> | Joi.ObjectSchema<UserRegisterData>;

type UserData = UserLoginData | UserRegisterData;

export const userValidation = (res: Response, schema: Schema, userData: UserData) => {
  const userValidateCandidate = schema.validate(userData);
  if (userValidateCandidate.error) {
    errorHandler(res, 409, `${userValidateCandidate.error.details[0].path[0]} validation error`);
    return false;
  }
  return true;
};
