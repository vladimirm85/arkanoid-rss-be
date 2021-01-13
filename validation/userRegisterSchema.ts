import * as Joi from 'joi';

export interface UserRegisterData {
  email: string;
  password: string;
  repeatPassword: string;
}

export const userRegisterSchema: Joi.ObjectSchema<UserRegisterData> = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string()
    .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$'))
    .required(),
  repeatPassword: Joi.ref('password'),
}).with('password', 'repeatPassword');
