import { Request, Response } from 'express';
import { pick } from 'lodash';
import { createToken, errorHandler, TokenUserData } from '../../utils';

export const loginGoogle = async (req: Request, res: Response): Promise<void | Response> => {
  const user = req.user;

  const baseUrl = process.env.FRONT_BASE_URL || 'http://localhost:3000';

  const token = await createToken(pick(user, ['_id', 'email']) as TokenUserData);
  if (!token) {
    errorHandler(res, 500, 'login: token was not created');
  }

  res.redirect(`${baseUrl}/social-login-success/?token=${token}`);
};
