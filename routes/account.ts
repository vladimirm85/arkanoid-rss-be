import { Router } from 'express';
import * as passport from 'passport';
import { verify, getAccount, forgotPassword, restorePassword } from '../controllers';

export const accountRouter = Router();

accountRouter.get('/', passport.authenticate('jwt', { session: false }), getAccount);

accountRouter.get('/verify/:key', verify);

accountRouter.get(
  '/forgot-password/',
  passport.authenticate('jwt', { session: false }),
  forgotPassword
);

accountRouter.get(
  '/restore-password/:key',
  passport.authenticate('jwt', { session: false }),
  restorePassword
);
