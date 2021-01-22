import * as Joi from 'joi';

export interface RestorePasswordInterface {
  password: string;
  repeatPassword: string;
}

export const restorePasswordSchema: Joi.ObjectSchema<RestorePasswordInterface> = Joi.object({
  password: Joi.string()
    .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$'))
    .required(),
  repeatPassword: Joi.ref('password'),
}).with('password', 'repeatPassword');
