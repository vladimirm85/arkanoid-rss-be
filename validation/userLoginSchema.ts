import * as Joi from 'joi';

export interface UserLoginData {
  email: string;
  password: string;
}

export const userLoginSchema: Joi.ObjectSchema<UserLoginData> = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string()
    .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$'))
    .required(),
});
